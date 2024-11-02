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

import { GetTarget200ResponseProvider } from "./getTarget200ResponseProvider";
import { GetTarget200ResponseVariablesInner } from "./getTarget200ResponseVariablesInner";
import { RequestFile } from "./models";

export class GetTarget200Response {
  "id": string;
  "name": string;
  "workspaceId": string;
  "kind": string;
  "identifier": string;
  "version": string;
  "config": { [key: string]: any };
  "lockedAt"?: Date | null;
  "updatedAt": Date;
  "provider"?: GetTarget200ResponseProvider | null;
  "metadata": { [key: string]: string };
  "variables"?: Array<GetTarget200ResponseVariablesInner>;

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
      name: "workspaceId",
      baseName: "workspaceId",
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
      name: "version",
      baseName: "version",
      type: "string",
    },
    {
      name: "config",
      baseName: "config",
      type: "{ [key: string]: any; }",
    },
    {
      name: "lockedAt",
      baseName: "lockedAt",
      type: "Date",
    },
    {
      name: "updatedAt",
      baseName: "updatedAt",
      type: "Date",
    },
    {
      name: "provider",
      baseName: "provider",
      type: "GetTarget200ResponseProvider",
    },
    {
      name: "metadata",
      baseName: "metadata",
      type: "{ [key: string]: string; }",
    },
    {
      name: "variables",
      baseName: "variables",
      type: "Array<GetTarget200ResponseVariablesInner>",
    },
  ];

  static getAttributeTypeMap() {
    return GetTarget200Response.attributeTypeMap;
  }
}
