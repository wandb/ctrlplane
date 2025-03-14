import { NextResponse } from "next/server";
import httpStatus from "http-status";
import { z } from "zod";

import { eq } from "@ctrlplane/db";
import { resource, workspace } from "@ctrlplane/db/schema";
import { logger } from "@ctrlplane/logger";
import { Permission } from "@ctrlplane/validators/auth";

import { authn, authz } from "../../../auth";
import { request } from "../../../middleware";

const log = logger.child({
  module: "api/v1/workspaces/:workspaceId/resources",
});

export const GET = request()
  .use(authn)
  .use(
    authz(({ can, extra: { params } }) =>
      can
        .perform(Permission.ResourceList)
        .on({ type: "workspace", id: params.workspaceId }),
    ),
  )
  .handle<unknown, { params: { workspaceId: string } }>(
    async (ctx, { params }) =>
      ctx.db
        .select()
        .from(resource)
        .where(eq(workspace.id, params.workspaceId))
        .orderBy(resource.name)
        .then((environments) => ({ data: environments }))
        .then((paginated) =>
          NextResponse.json(paginated, { status: httpStatus.CREATED }),
        )
        .catch((error) => {
          console.log(error);
          if (error instanceof z.ZodError)
            return NextResponse.json(
              { error: error.errors },
              { status: httpStatus.BAD_REQUEST },
            );

          log.error("Error getting systems:", error);
          return NextResponse.json(
            { error: "Internal Server Error" },
            { status: httpStatus.INTERNAL_SERVER_ERROR },
          );
        }),
  );
