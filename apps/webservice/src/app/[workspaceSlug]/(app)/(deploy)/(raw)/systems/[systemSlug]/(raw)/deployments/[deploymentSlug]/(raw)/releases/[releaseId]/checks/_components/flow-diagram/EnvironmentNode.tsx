import type * as SCHEMA from "@ctrlplane/db/schema";
import type {
  EnvironmentCondition,
  JobCondition,
  ReleaseCondition as JobReleaseCondition,
  StatusCondition,
} from "@ctrlplane/validators/jobs";
import type { NodeProps } from "reactflow";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { IconExternalLink, IconPlant } from "@tabler/icons-react";
import { differenceInMilliseconds } from "date-fns";
import _ from "lodash";
import prettyMilliseconds from "pretty-ms";
import { Handle, Position } from "reactflow";
import colors from "tailwindcss/colors";

import { cn } from "@ctrlplane/ui";
import { Button, buttonVariants } from "@ctrlplane/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@ctrlplane/ui/hover-card";
import { Separator } from "@ctrlplane/ui/separator";
import {
  ColumnOperator,
  ComparisonOperator,
  ConditionType,
} from "@ctrlplane/validators/conditions";
import { JobConditionType, JobStatus } from "@ctrlplane/validators/jobs";

import { useDeploymentVersionChannelDrawer } from "~/app/[workspaceSlug]/(app)/_components/channel/drawer/useDeploymentVersionChannelDrawer";
import { useDeploymentVersionChannel } from "~/app/[workspaceSlug]/(app)/_hooks/channel/useDeploymentVersionChannel";
import { urls } from "~/app/urls";
import { api } from "~/trpc/react";
import { Cancelled, Failing, Loading, Passing, Waiting } from "./StatusIcons";

type EnvironmentNodeProps = NodeProps<{
  workspaceId: string;
  policy?: SCHEMA.EnvironmentPolicy;
  versionId: string;
  versionTag: string;
  deploymentId: string;
  environmentId: string;
  environmentName: string;
}>;

const WaitingOnActiveCheck: React.FC<EnvironmentNodeProps["data"]> = ({
  workspaceId,
  versionId,
  environmentId,
}) => {
  const { workspaceSlug, systemSlug, deploymentSlug } = useParams<{
    workspaceSlug: string;
    systemSlug: string;
    deploymentSlug: string;
  }>();

  const isSameEnvironment: EnvironmentCondition = {
    type: JobConditionType.Environment,
    operator: ColumnOperator.Equals,
    value: environmentId,
  };

  const isPending: StatusCondition = {
    type: JobConditionType.Status,
    operator: ColumnOperator.Equals,
    value: JobStatus.Pending,
  };

  const isInProgress: StatusCondition = {
    type: JobConditionType.Status,
    operator: ColumnOperator.Equals,
    value: JobStatus.InProgress,
  };

  const isSameVersion: JobReleaseCondition = {
    type: JobConditionType.Release,
    operator: ColumnOperator.Equals,
    value: versionId,
  };

  const isDifferentVersion: JobCondition = {
    type: ConditionType.Comparison,
    operator: ComparisonOperator.And,
    not: true,
    conditions: [isSameVersion],
  };

  const pendingJobsForCurrentVersionAndEnvSelector: JobCondition = {
    type: ConditionType.Comparison,
    operator: ComparisonOperator.And,
    conditions: [isSameEnvironment, isPending, isSameVersion],
  };

  const inProgressJobsForDifferentVersionAndCurrentEnvSelector: JobCondition = {
    type: ConditionType.Comparison,
    operator: ComparisonOperator.And,
    conditions: [isSameEnvironment, isInProgress, isDifferentVersion],
  };

  const pendingJobsQ = api.job.config.byWorkspaceId.list.useQuery(
    {
      workspaceId,
      filter: pendingJobsForCurrentVersionAndEnvSelector,
      limit: 1,
    },
    { refetchInterval: 5_000 },
  );

  const inProgressJobsQ = api.job.config.byWorkspaceId.list.useQuery(
    {
      workspaceId,
      filter: inProgressJobsForDifferentVersionAndCurrentEnvSelector,
      limit: 1,
    },
    { refetchInterval: 5_000 },
  );

  const loading = pendingJobsQ.isLoading || inProgressJobsQ.isLoading;

  const isCurrentVersionPending =
    pendingJobsQ.data != null && pendingJobsQ.data.length > 0;
  const isSeparateVersionBeingDeployed =
    inProgressJobsQ.data != null && inProgressJobsQ.data.length > 0;

  const isWaitingOnActive =
    isCurrentVersionPending && isSeparateVersionBeingDeployed;

  const activeVersions = _.chain(inProgressJobsQ.data ?? [])
    .groupBy((job) => job.version.id)
    .map((jobs) => jobs[0]!.version)
    .value();

  const getActiveVersionUrl = (versionId: string) =>
    urls
      .workspace(workspaceSlug)
      .system(systemSlug)
      .deployment(deploymentSlug)
      .release(versionId)
      .jobs();

  return (
    <div className="flex items-center gap-1">
      {loading && <Loading />}
      {!loading && isWaitingOnActive && (
        <>
          <Waiting className="mr-1" />
          <div>Another</div>
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="cursor-pointer underline underline-offset-1">
                version
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-60 space-y-1 p-2" side="top">
              {activeVersions.map((version) => (
                <Link
                  href={getActiveVersionUrl(version.id)}
                  key={version.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({
                    variant: "ghost",
                    className: "flex w-full items-center justify-between",
                  })}
                >
                  <div className="truncate">{version.name}</div>
                  <IconExternalLink className="h-4 w-4 flex-shrink-0" />
                </Link>
              ))}
            </HoverCardContent>
          </HoverCard>

          <div>is deploying</div>
        </>
      )}
      {!loading && !isWaitingOnActive && (
        <>
          <Passing /> All other versions deployed
        </>
      )}
    </div>
  );
};

const DeploymentVersionChannelCheck: React.FC<EnvironmentNodeProps["data"]> = ({
  deploymentId,
  environmentId,
  versionTag,
}) => {
  const { setDeploymentVersionChannelId } = useDeploymentVersionChannelDrawer();
  const {
    isPassingDeploymentVersionChannel,
    deploymentVersionChannelId,
    loading,
  } = useDeploymentVersionChannel(deploymentId, environmentId, versionTag);

  return (
    <div className="flex items-center gap-2">
      {loading && <Loading />}
      {!loading && deploymentVersionChannelId == null && (
        <>
          <Cancelled /> No deployment version channel
        </>
      )}
      {!loading &&
        deploymentVersionChannelId != null &&
        !isPassingDeploymentVersionChannel && (
          <>
            <Failing />
            <span className="flex items-center gap-1">
              <div>Blocked by</div>{" "}
              <Button
                variant="link"
                onClick={() =>
                  setDeploymentVersionChannelId(deploymentVersionChannelId)
                }
                className="h-fit px-0 py-0 text-inherit underline-offset-2"
              >
                deployment version channel
              </Button>
            </span>
          </>
        )}
      {!loading &&
        deploymentVersionChannelId != null &&
        isPassingDeploymentVersionChannel && (
          <>
            <Passing />
            <span className="flex items-center gap-1">
              Passing{" "}
              <Button
                variant="link"
                onClick={() =>
                  setDeploymentVersionChannelId(deploymentVersionChannelId)
                }
                className="h-fit px-0 py-0 text-inherit underline-offset-2"
              >
                deployment version channel
              </Button>
            </span>
          </>
        )}
    </div>
  );
};

const MinDeployIntervalCheck: React.FC<EnvironmentNodeProps["data"]> = ({
  policy,
  deploymentId,
  environmentId,
}) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const { data: latestDeployedVersion, isLoading } =
    api.deployment.version.latest.completed.useQuery(
      { deploymentId, environmentId },
      { enabled: policy != null },
    );

  useEffect(() => {
    if (!latestDeployedVersion || !policy?.minimumReleaseInterval) return;

    const calculateTimeLeft = () => {
      const timePassed = differenceInMilliseconds(
        new Date(),
        latestDeployedVersion.createdAt,
      );
      return Math.max(0, policy.minimumReleaseInterval - timePassed);
    };

    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      if (remaining <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [latestDeployedVersion, policy?.minimumReleaseInterval]);

  if (policy == null) return null;
  const { minimumReleaseInterval } = policy;
  if (minimumReleaseInterval === 0) return null;
  if (isLoading)
    return (
      <div className="flex items-center gap-2">
        <Loading />
      </div>
    );

  if (latestDeployedVersion == null || timeLeft === 0)
    return (
      <div className="flex items-center gap-2">
        <Passing />
        <span className="flex items-center gap-1">
          Deployment cooldown finished
        </span>
      </div>
    );

  return (
    <div className="flex items-center gap-2">
      <Waiting />

      <div className="h-fit px-0 py-0 text-inherit underline-offset-2">
        {prettyMilliseconds(timeLeft ?? 0, { compact: true })} deployment
        cooldown
      </div>
    </div>
  );
};

export const EnvironmentNode: React.FC<EnvironmentNodeProps> = ({ data }) => (
  <>
    <div
      className={cn("relative w-[350px] space-y-1 rounded-md border text-sm")}
    >
      <div className="flex items-center gap-2 p-2">
        <div className="flex-shrink-0 rounded bg-green-500/20 p-1 text-green-400">
          <IconPlant className="h-3 w-3" />
        </div>
        {data.environmentName}
      </div>
      <Separator className="!m-0 bg-neutral-800" />
      <div className="space-y-1 px-2 pb-2">
        <WaitingOnActiveCheck {...data} />
        <DeploymentVersionChannelCheck {...data} />
        <MinDeployIntervalCheck {...data} />
      </div>
    </div>
    <Handle
      type="target"
      className="h-2 w-2 rounded-full border border-neutral-500"
      style={{ background: colors.neutral[800] }}
      position={Position.Left}
    />
    <Handle
      type="source"
      className="h-2 w-2 rounded-full border border-neutral-500"
      style={{ background: colors.neutral[800] }}
      position={Position.Right}
    />
  </>
);
