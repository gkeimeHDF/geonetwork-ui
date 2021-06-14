/**
 * GeoNetwork 4.0.3 OpenAPI Documentation
 * This is the description of the GeoNetwork OpenAPI. Use this API to manage your catalog.
 *
 * The version of the OpenAPI document: 4.0.3
 * Contact: geonetwork-users@lists.sourceforge.net
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { MetadataLinkApiModel } from './metadataLink.api.model';
import { LinkStatusApiModel } from './linkStatus.api.model';
import { ISODateApiModel } from './iSODate.api.model';

export interface LinkApiModel {
  records?: Set<MetadataLinkApiModel>;
  linkStatus?: Set<LinkStatusApiModel>;
  lastState?: number;
  lastCheck?: ISODateApiModel;
  protocol?: string;
  url?: string;
  id?: number;
  linkType?: LinkApiModel.LinkTypeEnum;
}
export namespace LinkApiModel {
  export type LinkTypeEnum = 'HTTP' | 'METADATA';
  export const LinkTypeEnum = {
    Http: 'HTTP' as LinkTypeEnum,
    Metadata: 'METADATA' as LinkTypeEnum,
  };
}
