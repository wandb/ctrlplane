"use client";

import React from "react";
import { useParams, usePathname } from "next/navigation";

import {
  TabLink,
  Tabs,
  TabsList,
} from "~/app/[workspaceSlug]/(app)/_components/navigation/Tabs";
import { urls } from "~/app/urls";

const getActiveTab = (url: string) => {
  if (url.endsWith("/approval")) return "approval";
  if (url.endsWith("/control")) return "control";
  if (url.endsWith("/management")) return "management";
  if (url.endsWith("/channels")) return "channels";
  if (url.endsWith("/rollout")) return "rollout";
  return "approval";
};

export const PolicyTabs: React.FC = () => {
  const { workspaceSlug, systemSlug, environmentId } = useParams<{
    workspaceSlug: string;
    systemSlug: string;
    environmentId: string;
  }>();

  const pathname = usePathname();
  const activeTab = getActiveTab(pathname);
  const baseUrl = urls
    .workspace(workspaceSlug)
    .system(systemSlug)
    .environment(environmentId)
    .policies();

  return (
    <Tabs>
      <TabsList>
        <TabLink
          href={`${baseUrl}/approval`}
          isActive={activeTab === "approval"}
        >
          Approval & Governance
        </TabLink>
        <TabLink href={`${baseUrl}/control`} isActive={activeTab === "control"}>
          Deployment Control
        </TabLink>
        <TabLink
          href={`${baseUrl}/management`}
          isActive={activeTab === "management"}
        >
          Release Management
        </TabLink>
        <TabLink
          href={`${baseUrl}/channels`}
          isActive={activeTab === "channels"}
        >
          Deployment Version Channels
        </TabLink>
        <TabLink href={`${baseUrl}/rollout`} isActive={activeTab === "rollout"}>
          Rollout & Timing
        </TabLink>
      </TabsList>
    </Tabs>
  );
};
