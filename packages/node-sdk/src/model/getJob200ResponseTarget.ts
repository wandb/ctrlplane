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

export class GetJob200ResponseTarget {
  "id": string;
  "name": string;
  "version": string;
  "kind": string;
  "identifier": string;
  "workspaceId": string;
  "config": object;
  "metadata": object;

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
      name: "version",
      baseName: "version",
      type: "string",
    },
    {
      name: "kind",
      baseName: "kind",
      type: "string",
    },
    {
      name: "identifier",
      baseName: "identifier",
      type: "string",
    },
    {
      name: "workspaceId",
      baseName: "workspaceId",
      type: "string",
    },
    {
      name: "config",
      baseName: "config",
      type: "object",
    },
    {
      name: "metadata",
      baseName: "metadata",
      type: "object",
    },
  ];

  static getAttributeTypeMap() {
    return GetJob200ResponseTarget.attributeTypeMap;
  }
}
