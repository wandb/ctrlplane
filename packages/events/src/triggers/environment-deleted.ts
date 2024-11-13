import type { HookEvent } from "@ctrlplane/validators/events";
import type { ResourceCondition } from "@ctrlplane/validators/targets";
import { isPresent } from "ts-is-present";

import { and, eq, inArray, isNotNull, ne } from "@ctrlplane/db";
import { db } from "@ctrlplane/db/client";
import * as SCHEMA from "@ctrlplane/db/schema";
import { ComparisonOperator } from "@ctrlplane/validators/conditions";
import { ResourceFilterType } from "@ctrlplane/validators/targets";

export const getEventsForEnvironmentDeleted = async (
  environment: SCHEMA.Environment,
): Promise<HookEvent[]> => {
  if (environment.resourceFilter == null) return [];
  const targets = await db
    .select()
    .from(SCHEMA.resource)
    .where(SCHEMA.resourceMatchesMetadata(db, environment.resourceFilter));
  if (targets.length === 0) return [];

  const checks = and(
    isNotNull(SCHEMA.environment.resourceFilter),
    ne(SCHEMA.environment.id, environment.id),
  );
  const system = await db.query.system.findFirst({
    where: eq(SCHEMA.system.id, environment.systemId),
    with: { environments: { where: checks }, deployments: true },
  });
  if (system == null) return [];

  const envFilters = system.environments
    .map((e) => e.resourceFilter)
    .filter(isPresent);

  const removedFromSystemFilter: ResourceCondition = {
    type: ResourceFilterType.Comparison,
    operator: ComparisonOperator.Or,
    not: true,
    conditions: envFilters,
  };

  const removedFromSystemTargets =
    envFilters.length > 0
      ? await db
          .select()
          .from(SCHEMA.resource)
          .where(
            and(
              SCHEMA.resourceMatchesMetadata(db, removedFromSystemFilter),
              inArray(
                SCHEMA.resource.id,
                targets.map((t) => t.id),
              ),
            ),
          )
      : targets;
  if (removedFromSystemTargets.length === 0) return [];

  return system.deployments.flatMap((deployment) =>
    removedFromSystemTargets.map((target) => ({
      action: "deployment.target.removed",
      payload: { deployment, target },
    })),
  );
};
