import { NextResponse } from "next/server";

import { and, eq } from "@ctrlplane/db";
import * as schema from "@ctrlplane/db/schema";
import { Permission } from "@ctrlplane/validators/auth";

import { authn, authz } from "~/app/api/v1/auth";
import { request } from "~/app/api/v1/middleware";

export const DELETE = request()
  .use(authn)
  .use(
    authz(({ can, params }) =>
      can
        .perform(Permission.DeploymentVersionChannelDelete)
        .on({ type: "deployment", id: params.deploymentId ?? "" }),
    ),
  )
  .handle<unknown, { params: Promise<{ deploymentId: string; name: string }> }>(
    async (ctx, { params }) => {
      const { deploymentId, name } = await params;
      try {
        await ctx.db
          .delete(schema.deploymentVersionChannel)
          .where(
            and(
              eq(schema.deploymentVersionChannel.deploymentId, deploymentId),
              eq(schema.deploymentVersionChannel.name, name),
            ),
          );

        return NextResponse.json(
          { message: "Release channel deleted" },
          { status: 200 },
        );
      } catch {
        return NextResponse.json(
          { error: "Failed to delete release channel" },
          { status: 500 },
        );
      }
    },
  );
