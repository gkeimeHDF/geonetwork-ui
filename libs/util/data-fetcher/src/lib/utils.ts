import {
  DataItem,
  DatasetHeaders,
  FetchError,
  PropertyInfo,
  SupportedType,
  SupportedTypes,
} from './model'
import { sharedFetch, useCache } from '@camptocamp/ogc-client'
import { parseHeaders } from './headers'
import parseDate from 'date-fns/parse'
import parseIsoDate from 'date-fns/parseISO'

export async function inferDatasetType(
  url: string,
  typeHint?: SupportedType
): Promise<SupportedType> {
  const fileExtensionMatches = new URL(
    url,
    typeof window !== 'undefined' ? window.location.toString() : undefined
  ).pathname.match(/\.(.+)$/)
  const fileExtension =
    fileExtensionMatches && fileExtensionMatches.length
      ? (fileExtensionMatches[1].toLowerCase() as SupportedType)
      : null

  // 1. type hint
  if (typeHint) return Promise.resolve(typeHint)

  // 2. content-type header
  const headers = await fetchHeaders(url)
  if ('supportedType' in headers) return headers.supportedType
  // 3. file extension from url
  else if (SupportedTypes.indexOf(fileExtension) > -1) return fileExtension

  // no type inferred or hinted
  if ('mimeType' in headers) throw FetchError.unsupportedType(headers.mimeType)
  else throw FetchError.unknownType()
}

export function fetchHeaders(url: string): Promise<DatasetHeaders> {
  return sharedFetch(url, 'HEAD')
    .catch((error) => {
      throw FetchError.corsOrNetwork(error.message)
    })
    .then((response) => {
      if (!response.ok) {
        throw FetchError.http(response.status)
      }
      return parseHeaders(response.headers)
    })
}

export function fetchDataAsText(url: string): Promise<string> {
  return useCache(
    () =>
      sharedFetch(url).then(async (response) => {
        if (!response.ok) {
          throw FetchError.http(response.status)
        }
        return response.text()
      }),
    url,
    'asText'
  )
}
export function fetchDataAsArrayBuffer(url: string): Promise<ArrayBuffer> {
  return useCache(
    () =>
      sharedFetch(url).then(async (response) => {
        if (!response.ok) {
          throw FetchError.http(response.status)
        }
        // convert to a numeric array so that we can store the response in cache
        return Array.from(new Uint8Array(await response.arrayBuffer()))
      }),
    url,
    'asArrayBuffer'
  ).then((array) => {
    return new Uint8Array(array).buffer
  })
}

export function tryParseDate(input: string): Date | null {
  function tryIso() {
    const parsed = parseIsoDate(input)
    return isNaN(parsed.getDate()) ? null : parsed
  }
  function tryFormat(format: string) {
    const parsed = parseDate(input, format, new Date())
    return isNaN(parsed.getDate()) ? null : parsed
  }
  return (
    tryIso() ||
    tryFormat('dd/MM/yyyy') ||
    tryFormat('dd.MM.yyyy') ||
    tryFormat('MM/dd/yyyy') ||
    null
  )
}

export function tryParseNumber(input: string): number | null {
  if (isNaN(input as any)) return null
  const parsed = parseFloat(input)
  return isNaN(parsed) ? null : parsed
}

export function jsonToGeojsonFeature(object: { [key: string]: any }): DataItem {
  const { id, properties } = Object.keys(object)
    .map((property) => (property ? property : 'unknown')) //prevent empty strings
    .reduce(
      (prev, curr) =>
        curr.toLowerCase().endsWith('id')
          ? {
              ...prev,
              id: object[curr],
            }
          : {
              ...prev,
              properties: { ...prev.properties, [curr]: object[curr] },
            },
      { id: undefined, properties: {} }
    )
  return {
    type: 'Feature',
    geometry: null,
    properties,
    ...(id !== undefined && { id }),
  }
}

function mutateProperties(
  items: DataItem[],
  mutators: { [fieldName: string]: (value: unknown) => unknown }
): DataItem[] {
  const mutatorKeys = Object.keys(mutators)
  for (let i = 0, ii = items.length; i < ii; i++) {
    const item = items[i]
    for (const mutatorField of mutatorKeys) {
      if (!(mutatorField in item.properties)) continue
      item.properties[mutatorField] = mutators[mutatorField](
        item.properties[mutatorField]
      )
    }
  }
  return items
}

const SAMPLE_SIZE = 20

/**
 * This will infer field types from a list of data items and cast the values accordingly
 * @param items
 * @param inferTypes
 */
export function processItemProperties(
  items: DataItem[],
  inferTypes = false
): {
  items: DataItem[]
  properties: PropertyInfo[]
} {
  const foundFields: { [name: string]: PropertyInfo } = {}
  for (let i = 0, ii = Math.min(SAMPLE_SIZE, items.length); i < ii; i++) {
    const item = items[i]
    const fields = Object.keys(item.properties)
    for (const field of fields) {
      if (!(field in foundFields)) {
        foundFields[field] = {
          label: field,
          name: field,
          type: null,
        }
      }
      const value = item.properties[field]
      const info = foundFields[field]
      if (value === undefined || value === '' || value === null) continue

      if (!inferTypes) {
        if (info.type === null && typeof value === 'number') {
          info.type = 'number'
        } else if (info.type === 'number' && typeof value !== 'number') {
          info.type = 'string'
        }
        continue
      }

      const parsedNumber = tryParseNumber(value)
      if (info.type === null && parsedNumber !== null) {
        info.type = 'number'
        continue
      } else if (info.type === 'number' && parsedNumber === null) {
        info.type = 'string'
        continue
      }
      const parsedDate = tryParseDate(value)
      if (info.type === null && parsedDate !== null) {
        info.type = 'date'
      } else if (info.type === 'date' && parsedDate === null) {
        info.type = 'string'
      }
    }
  }

  const properties: PropertyInfo[] = []
  const mutators = {}
  for (const field in foundFields) {
    const info = foundFields[field]
    if (info.type === 'number') {
      mutators[field] = tryParseNumber
    } else if (info.type === 'date') {
      mutators[field] = tryParseDate
    }
    properties.push({ ...info, type: info.type || 'string' })
  }
  if (inferTypes) {
    mutateProperties(items, mutators)
  }
  return { items, properties }
}

/**
 * This creates a Proxy that allows reading and writing to the data item properties
 * as if it was a simple array of JSON objects
 * @param items
 */
export function getJsonDataItemsProxy(
  items: DataItem[]
): Record<string, unknown>[] {
  return new Proxy<Record<string, unknown>[]>(items as any, {
    get(target: Record<string, unknown>[], p: string) {
      if (!Number.isNaN(parseInt(p)) && target[p]?.properties) {
        return target[p].properties
      }
      return target[p]
    },
    set() {
      throw new Error('This object is read-only')
    },
  })
}
