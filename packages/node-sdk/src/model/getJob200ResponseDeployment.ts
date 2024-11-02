/**
 * Ctrlplane API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { RequestFile } from "./models";

export class GetJob200ResponseDeployment {
  "id": string;
  "name"?: string;
  "slug": string;
  "systemId": string;
  "jobAgentId": string;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{
    name: string;
    baseName: string;
    type: string;
  }> = [
    {
      name: "id",
      baseName: "id",
      type: "string",
    },
    {
      name: "name",
      baseName: "name",
      type: "string",
    },
    {
      name: "slug",
      baseName: "slug",
      type: "string",
    },
    {
      name: "systemId",
      baseName: "systemId",
      type: "string",
    },
    {
      name: "jobAgentId",
      baseName: "jobAgentId",
      type: "string",
    },
  ];

  static getAttributeTypeMap() {
    return GetJob200ResponseDeployment.attributeTypeMap;
  }
}
