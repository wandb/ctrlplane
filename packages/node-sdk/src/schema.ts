/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/v1/environments": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Create an environment */
    post: operations["createEnvironment"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/job-agents/{agentId}/jobs/running": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get a agents running jobs */
    get: operations["getAgentRunningJob"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/job-agents/{agentId}/queue/acknowledge": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /**
     * Acknowledge a job for an agent
     * @description Marks a job as acknowledged by the agent
     */
    post: operations["acknowledgeAgentJob"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/job-agents/{agentId}/queue/next": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get the next jobs */
    get: operations["getNextJobs"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/job-agents/name": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    /** Upserts the agent */
    patch: operations["updateJobAgent"];
    trace?: never;
  };
  "/v1/jobs/{jobId}/acknowledge": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Acknowledge a job */
    post: operations["acknowledgeJob"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/jobs/{jobId}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get a Job */
    get: operations["getJob"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    /** Update a job */
    patch: operations["updateJob"];
    trace?: never;
  };
  "/v1/release-channels": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Create a release channel */
    post: operations["createReleaseChannel"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/releases": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Creates a release */
    post: operations["createRelease"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/resource-providers/{providerId}/set": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    /** Sets the resource for a provider. */
    patch: operations["setResourceProvidersResources"];
    trace?: never;
  };
  "/v1/resources/{resourceId}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get a resource */
    get: operations["getResource"];
    put?: never;
    post?: never;
    /** Delete a resource */
    delete: operations["deleteResource"];
    options?: never;
    head?: never;
    /** Update a resource */
    patch: operations["updateResource"];
    trace?: never;
  };
  "/v1/resources": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Create or update multiple resources */
    post: operations["upsertResources"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/workspaces/{workspaceId}/resource-providers/name/{name}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Upserts a resource provider. */
    get: operations["upsertResourceProvider"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/workspaces/{workspaceId}/resources/identifier/{identifier}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get a resource by identifier */
    get: operations["getResourceByIdentifier"];
    put?: never;
    post?: never;
    /** Delete a resource by identifier */
    delete: operations["deleteResourceByIdentifier"];
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    Variable: {
      key: string;
      value: string | number | boolean;
      sensitive?: boolean;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  createEnvironment: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": {
          systemId: string;
          name: string;
          description?: string;
          resourceFilter?: {
            [key: string]: unknown;
          };
          policyId?: string;
          releaseChannels?: string[];
          /** Format: date-time */
          expiresAt?: string;
        };
      };
    };
    responses: {
      /** @description Environment created successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            environment?: {
              systemId: string;
              name?: string;
              description?: string;
              /** Format: date-time */
              expiresAt?: string | null;
              resourceFilter?: {
                [key: string]: unknown;
              };
            };
          };
        };
      };
      /** @description Environment already exists */
      409: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            error?: string;
            id?: string;
          };
        };
      };
      /** @description Failed to create environment */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            error: string;
          };
        };
      };
    };
  };
  getAgentRunningJob: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The execution ID */
        agentId: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            id: string;
            status: string;
            message: string;
            jobAgentId: string;
            jobAgentConfig: Record<string, never>;
            externalId: string | null;
            release?: Record<string, never>;
            deployment?: Record<string, never>;
            config: Record<string, never>;
            runbook?: Record<string, never>;
            target?: Record<string, never>;
            environment?: Record<string, never>;
          }[];
        };
      };
    };
  };
  acknowledgeAgentJob: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The ID of the job agent */
        agentId: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successfully acknowledged job */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            job?: Record<string, never>;
          };
        };
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            error?: string;
          };
        };
      };
      /** @description Workspace not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            error?: string;
          };
        };
      };
    };
  };
  getNextJobs: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The agent ID */
        agentId: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            jobs?: {
              /** @description The job ID */
              id: string;
              status: string;
              jobAgentId: string;
              jobAgentConfig: Record<string, never>;
              message: string;
              releaseJobTriggerId: string;
            }[];
          };
        };
      };
    };
  };
  updateJobAgent: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": {
          workspaceId: string;
          name: string;
          type: string;
        };
      };
    };
    responses: {
      /** @description Successfully retrieved or created the agent */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            id: string;
            name: string;
            workspaceId: string;
          };
        };
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  acknowledgeJob: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The job ID */
        jobId: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            sucess: boolean;
          };
        };
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            error: string;
          };
        };
      };
    };
  };
  getJob: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The job ID */
        jobId: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            id: string;
            /** @enum {string} */
            status:
              | "completed"
              | "cancelled"
              | "skipped"
              | "in_progress"
              | "action_required"
              | "pending"
              | "failure"
              | "invalid_job_agent"
              | "invalid_integration"
              | "external_run_not_found";
            /** @description External job identifier (e.g. GitHub workflow run ID) */
            externalId?: string | null;
            release?: {
              id: string;
              version: string;
              metadata: Record<string, never>;
              config: Record<string, never>;
            };
            deployment?: {
              id: string;
              name?: string;
              slug: string;
              systemId: string;
              jobAgentId: string;
            };
            runbook?: {
              id: string;
              name: string;
              systemId: string;
              jobAgentId: string;
            };
            resource?: {
              id: string;
              name: string;
              version: string;
              kind: string;
              identifier: string;
              workspaceId: string;
              config: Record<string, never>;
              metadata: Record<string, never>;
            };
            environment?: {
              id: string;
              name: string;
              systemId: string;
            };
            variables: Record<string, never>;
            approval?: {
              id: string;
              /** @enum {string} */
              status: "pending" | "approved" | "rejected";
              /** @description Null when status is pending, contains approver details when approved or rejected */
              approver?: {
                id: string;
                name: string;
              } | null;
            } | null;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
            /** @description Configuration for the Job Agent */
            jobAgentConfig: {
              [key: string]: unknown;
            };
          };
        };
      };
      /** @description Not Found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            /** @example Job not found. */
            error?: string;
          };
        };
      };
    };
  };
  updateJob: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The execution ID */
        jobId: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": {
          status?: string;
          message?: string | null;
          externalId?: string | null;
        };
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            id: string;
          };
        };
      };
    };
  };
  createReleaseChannel: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": {
          deploymentId: string;
          name: string;
          description?: string | null;
          releaseFilter: {
            [key: string]: unknown;
          };
        };
      };
    };
    responses: {
      /** @description Release channel created successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            id: string;
            deploymentId: string;
            name: string;
            description?: string | null;
            /** Format: date-time */
            createdAt: string;
            releaseFilter?: {
              [key: string]: unknown;
            };
          };
        };
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            error: string;
          };
        };
      };
      /** @description Forbidden */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            error: string;
          };
        };
      };
      /** @description Release channel already exists */
      409: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            error: string;
            id: string;
          };
        };
      };
      /** @description Failed to create release channel */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            error: string;
          };
        };
      };
    };
  };
  createRelease: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": {
          version: string;
          deploymentId: string;
          /** Format: date-time */
          createdAt?: string;
          name?: string;
          config?: {
            [key: string]: unknown;
          };
          metadata?: {
            [key: string]: string;
          };
        };
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            id?: string;
            version?: string;
            metadata?: {
              [key: string]: string;
            };
          };
        };
      };
      /** @description Release already exists */
      409: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            error?: string;
            id?: string;
          };
        };
      };
    };
  };
  setResourceProvidersResources: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description UUID of the scanner */
        providerId: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": {
          resources: {
            identifier: string;
            name: string;
            version: string;
            kind: string;
            config: {
              [key: string]: unknown;
            };
            metadata: {
              [key: string]: string;
            };
          }[];
        };
      };
    };
    responses: {
      /** @description Successfully updated the deployment resources */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Invalid request */
      400: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Deployment resources not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  getResource: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The resource ID */
        resourceId: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description OK */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            id: string;
            name: string;
            workspaceId: string;
            kind: string;
            identifier: string;
            version: string;
            config: {
              [key: string]: unknown;
            };
            /** Format: date-time */
            lockedAt?: string | null;
            /** Format: date-time */
            updatedAt: string;
            provider?: {
              id?: string;
              name?: string;
            } | null;
            metadata: {
              [key: string]: string;
            };
            variable: {
              [key: string]: string;
            };
          };
        };
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Permission denied */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Resource not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            /** @example Resource not found */
            error: string;
          };
        };
      };
    };
  };
  deleteResource: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description The resource ID */
        resourceId: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Resource deleted successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            success: boolean;
          };
        };
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Permission denied */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Resource not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            error: string;
          };
        };
      };
    };
  };
  updateResource: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        resourceId: string;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": {
          name?: string;
          version?: string;
          kind?: string;
          identifier?: string;
          workspaceId?: string;
          metadata?: {
            [key: string]: string;
          };
          variables?: components["schemas"]["Variable"][];
        };
      };
    };
    responses: {
      /** @description Resource updated successfully */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            id: string;
            name: string;
            workspaceId: string;
            kind: string;
            identifier: string;
            version: string;
            config: {
              [key: string]: unknown;
            };
            metadata: {
              [key: string]: string;
            };
          };
        };
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Permission denied */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Resource not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            error: string;
          };
        };
      };
    };
  };
  upsertResources: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": {
          /** Format: uuid */
          workspaceId: string;
          resources: {
            name: string;
            kind: string;
            identifier: string;
            version: string;
            config: Record<string, never>;
            metadata?: {
              [key: string]: string;
            };
            variables?: components["schemas"]["Variable"][];
          }[];
        };
      };
    };
    responses: {
      /** @description All of the cats */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            count?: number;
          };
        };
      };
    };
  };
  upsertResourceProvider: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description Name of the workspace */
        workspaceId: string;
        /** @description Name of the resource provider */
        name: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successfully retrieved or created the resource provider */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            id: string;
            name: string;
            workspaceId: string;
          };
        };
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Permission denied */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Workspace not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  getResourceByIdentifier: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description ID of the workspace */
        workspaceId: string;
        /** @description Identifier of the target */
        identifier: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successfully retrieved the target */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            id: string;
            identifier: string;
            workspaceId: string;
            providerId: string;
            provider?: {
              id?: string;
              name?: string;
              workspaceId?: string;
            };
            variables?: {
              id?: string;
              key?: string;
              value?: string;
            }[];
            metadata?: {
              [key: string]: string;
            };
          };
        };
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Permission denied */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Target not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            /** @example Target not found */
            error?: string;
          };
        };
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
  deleteResourceByIdentifier: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        /** @description ID of the workspace */
        workspaceId: string;
        /** @description Identifier of the resource */
        identifier: string;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successfully deleted the target */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            /** @example true */
            success?: boolean;
          };
        };
      };
      /** @description Unauthorized */
      401: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Permission denied */
      403: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Target not found */
      404: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": {
            /** @example Target not found */
            error?: string;
          };
        };
      };
      /** @description Internal server error */
      500: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
    };
  };
}
