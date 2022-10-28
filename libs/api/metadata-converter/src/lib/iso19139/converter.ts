import { CatalogRecord, DatasetRecord } from '../model'
import {
  createDocument,
  createElement,
  getRootElement,
  parseXmlString,
  xmlToString,
} from '../xml-utils'
import {
  writeAbstract,
  writeAccessConstraints,
  writeContacts,
  writeDatasetCreated,
  writeDatasetUpdated,
  writeDistributions,
  writeGraphicOverviews,
  writeKeywords,
  writeKind,
  writeLicenses,
  writeLineage,
  writeOwnerOrganisation,
  writeRecordUpdated,
  writeSpatialRepresentation,
  writeStatus,
  writeThemes,
  writeTitle,
  writeUniqueIdentifier,
  writeUpdateFrequency,
  writeUseLimitations,
} from './write-parts'
import {
  readAbstract,
  readAccessConstraints,
  readContacts,
  readDatasetCreated,
  readDatasetUpdated,
  readDistributions,
  readIsoTopics,
  readKeywords,
  readKind,
  readLicenses,
  readLineage,
  readOverviews,
  readOwnerOrganisation,
  readRecordUpdated,
  readSpatialExtents,
  readSpatialRepresentation,
  readStatus,
  readTemporalExtents,
  readThemes,
  readTitle,
  readUniqueIdentifier,
  readUpdateFrequency,
  readUseLimitations,
} from './read-parts'

export function toModel(xml: string): CatalogRecord {
  const doc = parseXmlString(xml)
  const rootEl = getRootElement(doc)

  const uniqueIdentifier = readUniqueIdentifier(rootEl)
  const kind = readKind(rootEl)
  const ownerOrganisation = readOwnerOrganisation(rootEl)
  const title = readTitle(rootEl)
  const abstract = readAbstract(rootEl)
  const contacts = readContacts(rootEl)
  const recordUpdated = readRecordUpdated(rootEl)
  const recordCreated = recordUpdated
  const keywords = readKeywords(rootEl)
  const themes = readThemes(rootEl)
  const status = readStatus(rootEl)
  const accessConstraints = readAccessConstraints(rootEl)
  const useLimitations = readUseLimitations(rootEl)
  const licenses = readLicenses(rootEl)

  // not used yet
  const isoTopics = readIsoTopics(rootEl)

  // TODO: only do these for dataset records
  const datasetCreated = readDatasetCreated(rootEl)
  const datasetUpdated = readDatasetUpdated(rootEl)
  const spatialRepresentation = readSpatialRepresentation(rootEl)
  const overviews = readOverviews(rootEl)
  const spatialExtents = readSpatialExtents(rootEl)
  const temporalExtents = readTemporalExtents(rootEl)
  const lineage = readLineage(rootEl)
  const distributions = readDistributions(rootEl)
  const updateFrequency = readUpdateFrequency(rootEl)

  return {
    uniqueIdentifier,
    kind,
    recordCreated,
    recordUpdated,
    status,
    title,
    abstract,
    ownerOrganisation,
    contacts,
    keywords,
    themes,
    accessConstraints,
    useLimitations,
    licenses,
    ...(datasetCreated && { datasetCreated }),
    ...(datasetUpdated && { datasetUpdated }),
    lineage,
    ...(spatialRepresentation && { spatialRepresentation }),
    overviews,
    spatialExtents,
    temporalExtents,
    distributions,
    updateFrequency,
  } as DatasetRecord
}

function isEqual<
  T extends
    | Array<unknown>
    | Record<string, unknown>
    | string
    | Date
    | number
    | URL
    | unknown
>(a: T, b: T): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.every((e, i) => isEqual(e, b[i]))
  } else if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime()
  } else if (a instanceof URL && b instanceof URL) {
    return a.toString() === b.toString()
  } else if (a instanceof Object && b instanceof Object) {
    return Object.keys(a).every((key) => isEqual(a[key], b[key]))
  }
  return a === b
}

export function toXml(record: CatalogRecord, originalXml?: string): string {
  const originalDoc = originalXml ? parseXmlString(originalXml) : null
  const originalRecord = originalXml ? toModel(originalXml) : null
  const rootEl = originalDoc
    ? getRootElement(originalDoc)
    : createElement('gmd:MD_Metadata')()

  function fieldChanged(name: string) {
    return originalRecord !== null
      ? !isEqual(record[name], originalRecord[name])
      : true
  }

  writeUniqueIdentifier(record, rootEl)
  writeKind(record, rootEl)
  fieldChanged('ownerOrganisation') && writeOwnerOrganisation(record, rootEl)
  fieldChanged('recordUpdated') && writeRecordUpdated(record, rootEl)
  writeTitle(record, rootEl)
  writeAbstract(record, rootEl)
  writeStatus(record, rootEl)
  fieldChanged('contacts') && writeContacts(record, rootEl)
  fieldChanged('keywords') && writeKeywords(record, rootEl)
  fieldChanged('themes') && writeThemes(record, rootEl)
  fieldChanged('accessConstraints') && writeAccessConstraints(record, rootEl)
  fieldChanged('licenses') && writeLicenses(record, rootEl)
  fieldChanged('useLimitations') && writeUseLimitations(record, rootEl)
  fieldChanged('updateFrequency') && writeUpdateFrequency(record, rootEl)

  if (record.kind === 'dataset') {
    fieldChanged('datasetCreated') && writeDatasetCreated(record, rootEl)
    fieldChanged('datasetUpdated') && writeDatasetUpdated(record, rootEl)
    fieldChanged('spatialRepresentation') &&
      writeSpatialRepresentation(record, rootEl)
    fieldChanged('overviews') && writeGraphicOverviews(record, rootEl)
    fieldChanged('distributions') && writeDistributions(record, rootEl)
    writeLineage(record, rootEl)
  }

  const newDocument = createDocument(rootEl)
  return xmlToString(newDocument)
}
