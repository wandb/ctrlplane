/* tslint:disable */
/* eslint-disable */
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

import type { GetJob200ResponseDeployment } from "./GetJob200ResponseDeployment";
import type { GetJob200ResponseRelease } from "./GetJob200ResponseRelease";
import type { GetJob200ResponseRunbook } from "./GetJob200ResponseRunbook";
import type { GetJob200ResponseTarget } from "./GetJob200ResponseTarget";
import { mapValues } from "../runtime";
import {
  GetJob200ResponseDeploymentFromJSON,
  GetJob200ResponseDeploymentFromJSONTyped,
  GetJob200ResponseDeploymentToJSON,
} from "./GetJob200ResponseDeployment";
import {
  GetJob200ResponseReleaseFromJSON,
  GetJob200ResponseReleaseFromJSONTyped,
  GetJob200ResponseReleaseToJSON,
} from "./GetJob200ResponseRelease";
import {
  GetJob200ResponseRunbookFromJSON,
  GetJob200ResponseRunbookFromJSONTyped,
  GetJob200ResponseRunbookToJSON,
} from "./GetJob200ResponseRunbook";
import {
  GetJob200ResponseTargetFromJSON,
  GetJob200ResponseTargetFromJSONTyped,
  GetJob200ResponseTargetToJSON,
} from "./GetJob200ResponseTarget";

/**
 *
 * @export
 * @interface GetJob200Response
 */
export interface GetJob200Response {
  /**
   *
   * @type {string}
   * @memberof GetJob200Response
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof GetJob200Response
   */
  status: GetJob200ResponseStatusEnum;
  /**
   *
   * @type {GetJob200ResponseRelease}
   * @memberof GetJob200Response
   */
  release?: GetJob200ResponseRelease;
  /**
   *
   * @type {GetJob200ResponseDeployment}
   * @memberof GetJob200Response
   */
  deployment?: GetJob200ResponseDeployment;
  /**
   *
   * @type {GetJob200ResponseRunbook}
   * @memberof GetJob200Response
   */
  runbook?: GetJob200ResponseRunbook;
  /**
   *
   * @type {GetJob200ResponseTarget}
   * @memberof GetJob200Response
   */
  target?: GetJob200ResponseTarget;
  /**
   *
   * @type {GetJob200ResponseRunbook}
   * @memberof GetJob200Response
   */
  environment?: GetJob200ResponseRunbook;
  /**
   *
   * @type {object}
   * @memberof GetJob200Response
   */
  variables?: object;
}

/**
 * @export
 */
export const GetJob200ResponseStatusEnum = {
  Completed: "completed",
  Cancelled: "cancelled",
  Skipped: "skipped",
  InProgress: "in_progress",
  ActionRequired: "action_required",
  Pending: "pending",
  Failure: "failure",
  InvalidJobAgent: "invalid_job_agent",
  InvalidIntegration: "invalid_integration",
  ExternalRunNotFound: "external_run_not_found",
} as const;
export type GetJob200ResponseStatusEnum =
  (typeof GetJob200ResponseStatusEnum)[keyof typeof GetJob200ResponseStatusEnum];

/**
 * Check if a given object implements the GetJob200Response interface.
 */
export function instanceOfGetJob200Response(
  value: object,
): value is GetJob200Response {
  if (!("id" in value) || value["id"] === undefined) return false;
  if (!("status" in value) || value["status"] === undefined) return false;
  return true;
}

export function GetJob200ResponseFromJSON(json: any): GetJob200Response {
  return GetJob200ResponseFromJSONTyped(json, false);
}

export function GetJob200ResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): GetJob200Response {
  if (json == null) {
    return json;
  }
  return {
    id: json["id"],
    status: json["status"],
    release:
      json["release"] == null
        ? undefined
        : GetJob200ResponseReleaseFromJSON(json["release"]),
    deployment:
      json["deployment"] == null
        ? undefined
        : GetJob200ResponseDeploymentFromJSON(json["deployment"]),
    runbook:
      json["runbook"] == null
        ? undefined
        : GetJob200ResponseRunbookFromJSON(json["runbook"]),
    target:
      json["target"] == null
        ? undefined
        : GetJob200ResponseTargetFromJSON(json["target"]),
    environment:
      json["environment"] == null
        ? undefined
        : GetJob200ResponseRunbookFromJSON(json["environment"]),
    variables: json["variables"] == null ? undefined : json["variables"],
  };
}

export function GetJob200ResponseToJSON(value?: GetJob200Response | null): any {
  if (value == null) {
    return value;
  }
  return {
    id: value["id"],
    status: value["status"],
    release: GetJob200ResponseReleaseToJSON(value["release"]),
    deployment: GetJob200ResponseDeploymentToJSON(value["deployment"]),
    runbook: GetJob200ResponseRunbookToJSON(value["runbook"]),
    target: GetJob200ResponseTargetToJSON(value["target"]),
    environment: GetJob200ResponseRunbookToJSON(value["environment"]),
    variables: value["variables"],
  };
}
