import { NextResponse } from "next/server";

import { eq } from "@ctrlplane/db";
import * as schema from "@ctrlplane/db/schema";
import { Permission } from "@ctrlplane/validators/auth";

import { authn, authz } from "../../../auth";
import { request } from "../../../middleware";

export const GET = request()
  .use(authn)
  .use(
    authz(({ can, params }) =>
      can.perform(Permission.EnvironmentGet).on({
        type: "environment",
        id: params.environmentId ?? "",
      }),
    ),
  )
  .handle<unknown, { params: Promise<{ environmentId: string }> }>(
    async (ctx, { params }) => {
      const { environmentId } = await params;

      const environment = await ctx.db.query.environment.findFirst({
        where: eq(schema.environment.id, environmentId),
        with: { system: true },
      });

      if (environment == null)
        return NextResponse.json(
          { error: "Environment not found" },
          { status: 404 },
        );

      if (environment.resourceSelector == null)
        return NextResponse.json(
          { error: "Environment has no resource selector" },
          { status: 400 },
        );

      const resources = await ctx.db
        .select()
        .from(schema.resource)
        .innerJoin(
          schema.computedEnvironmentResource,
          eq(schema.resource.id, schema.computedEnvironmentResource.resourceId),
        )
        .where(
          eq(schema.computedEnvironmentResource.environmentId, environmentId),
        )
        .limit(1_000)
        .then((res) => res.map((r) => ({ ...r.resource })));

      return NextResponse.json({
        resources,
        count: resources.length,
      });
    },
  );
