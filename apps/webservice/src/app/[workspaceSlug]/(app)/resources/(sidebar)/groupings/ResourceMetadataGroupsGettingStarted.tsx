"use client";

import type { Workspace } from "@ctrlplane/db/schema";
import { IconCategory } from "@tabler/icons-react";

import { Button } from "@ctrlplane/ui/button";

import { CreateMetadataGroupDialog } from "./CreateMetadataGroupDialog";

export const ResourceMetadataGroupsGettingStarted: React.FC<{
  workspace: Workspace;
}> = ({ workspace }) => {
  return (
    <div className="h-full w-full p-20">
      <div className="container m-auto max-w-xl space-y-6 p-20">
        <div className="relative -ml-1 text-neutral-500">
          <IconCategory className="h-10 w-10" strokeWidth={0.5} />
        </div>
        <div className="font-semibold">Resource Metadata Groups</div>
        <div className="prose prose-invert text-sm text-muted-foreground">
          <p>
            Resource metadata groups allow you to organize and categorize your
            resources based on specific metadata keys. By specifying key(s), you
            can group all matching resources and organize them by their
            corresponding values.
          </p>
          <p>
            This feature provides a powerful way to visualize and manage your
            infrastructure, allowing you to quickly identify and work with
            groups of related resources. For example, you could group resources
            by environment, region, or any other custom metadata you've defined.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <CreateMetadataGroupDialog workspaceId={workspace.id}>
            <Button size="sm">Create Metadata Group</Button>
          </CreateMetadataGroupDialog>
          <Button size="sm" variant="secondary">
            View Documentation
          </Button>
        </div>
      </div>
    </div>
  );
};
