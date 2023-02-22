import { DataItem, PropertyInfo } from '../lib/model'
import { processItemProperties } from '../lib/utils'
import { BaseFileDataset } from './base-file'

/**
 * This parser supports both Geojson Feature collections or arrays
 * of Features
 * @param text
 */
export function parseGeojson(text: string): {
  items: DataItem[]
  properties: PropertyInfo[]
} {
  const parsed = JSON.parse(text)
  const features =
    parsed.type === 'FeatureCollection' ? parsed.features : parsed
  if (!Array.isArray(features)) {
    throw new Error(
      'Could not parse GeoJSON, expected a features collection or an array of features at root level'
    )
  }
  return processItemProperties(features)
}

export class GeojsonDataset extends BaseFileDataset {
  getData() {
    return this.fetchAsText().then(parseGeojson)
  }
}
