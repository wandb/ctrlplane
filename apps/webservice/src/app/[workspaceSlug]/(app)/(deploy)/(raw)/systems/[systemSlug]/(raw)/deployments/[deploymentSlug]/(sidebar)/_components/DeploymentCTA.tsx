"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { Button } from "@ctrlplane/ui/button";

import { CreateDeploymentVersionDialog } from "~/app/[workspaceSlug]/(app)/(deploy)/_components/deployment-version/CreateDeploymentVersion";
import { CreateDeploymentVersionChannelDialog } from "../channels/CreateDeploymentVersionChannelDialog";
import { CreateVariableDialog } from "../variables/CreateVariableDialog";

export const DeploymentCTA: React.FC<{
  deploymentId: string;
  systemId: string;
}> = ({ deploymentId, systemId }) => {
  const pathname = usePathname();
  const tab = pathname.split("/").pop();

  if (tab === "variables")
    return (
      <CreateVariableDialog deploymentId={deploymentId}>
        <Button variant="outline" className="flex items-center gap-2" size="sm">
          Add Variable
        </Button>
      </CreateVariableDialog>
    );

  if (tab === "channels")
    return (
      <CreateDeploymentVersionChannelDialog deploymentId={deploymentId}>
        <Button variant="outline" className="flex items-center gap-2" size="sm">
          New Channel
        </Button>
      </CreateDeploymentVersionChannelDialog>
    );

  return (
    <CreateDeploymentVersionDialog
      deploymentId={deploymentId}
      systemId={systemId}
    >
      <Button variant="outline" className="flex items-center gap-2" size="sm">
        New Version
      </Button>
    </CreateDeploymentVersionDialog>
  );
};
