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

import { GetJob200ResponseApproval } from "./getJob200ResponseApproval";
import { GetJob200ResponseDeployment } from "./getJob200ResponseDeployment";
import { GetJob200ResponseEnvironment } from "./getJob200ResponseEnvironment";
import { GetJob200ResponseRelease } from "./getJob200ResponseRelease";
import { GetJob200ResponseRunbook } from "./getJob200ResponseRunbook";
import { GetJob200ResponseTarget } from "./getJob200ResponseTarget";
import { RequestFile } from "./models";

export class GetJob200Response {
  "id": string;
  "status": GetJob200Response.StatusEnum;
  "release"?: GetJob200ResponseRelease;
  "deployment"?: GetJob200ResponseDeployment;
  "runbook"?: GetJob200ResponseRunbook;
  "target"?: GetJob200ResponseTarget;
  "environment"?: GetJob200ResponseEnvironment;
  "variables": object;
  "approval"?: GetJob200ResponseApproval | null;
  "createdAt": Date;
  "updatedAt": Date;

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
      name: "status",
      baseName: "status",
      type: "GetJob200Response.StatusEnum",
    },
    {
      name: "release",
      baseName: "release",
      type: "GetJob200ResponseRelease",
    },
    {
      name: "deployment",
      baseName: "deployment",
      type: "GetJob200ResponseDeployment",
    },
    {
      name: "runbook",
      baseName: "runbook",
      type: "GetJob200ResponseRunbook",
    },
    {
      name: "target",
      baseName: "target",
      type: "GetJob200ResponseTarget",
    },
    {
      name: "environment",
      baseName: "environment",
      type: "GetJob200ResponseEnvironment",
    },
    {
      name: "variables",
      baseName: "variables",
      type: "object",
    },
    {
      name: "approval",
      baseName: "approval",
      type: "GetJob200ResponseApproval",
    },
    {
      name: "createdAt",
      baseName: "createdAt",
      type: "Date",
    },
    {
      name: "updatedAt",
      baseName: "updatedAt",
      type: "Date",
    },
  ];

  static getAttributeTypeMap() {
    return GetJob200Response.attributeTypeMap;
  }
}

export namespace GetJob200Response {
  export enum StatusEnum {
    Completed = <any>"completed",
    Cancelled = <any>"cancelled",
    Skipped = <any>"skipped",
    InProgress = <any>"in_progress",
    ActionRequired = <any>"action_required",
    Pending = <any>"pending",
    Failure = <any>"failure",
    InvalidJobAgent = <any>"invalid_job_agent",
    InvalidIntegration = <any>"invalid_integration",
    ExternalRunNotFound = <any>"external_run_not_found",
  }
}
