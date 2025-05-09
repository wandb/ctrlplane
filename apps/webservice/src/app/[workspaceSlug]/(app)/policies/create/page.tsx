import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@ctrlplane/ui/breadcrumb";

import { urls } from "~/app/urls";
import { api } from "~/trpc/server";
import { PolicyContextProvider } from "./_components/PolicyContext";
import { PolicyCreationTabs } from "./_components/PolicyCreationTabs";
import { PolicySubmit } from "./_components/PolicySubmit";

export const metadata = {
  title: "Create Deployment Policy | CtrlPlane",
  description:
    "Create a new deployment policy to control how changes are deployed",
};

export default async function CreatePolicyPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const workspaceSlug = (await params).workspaceSlug;
  const workspace = await api.workspace.bySlug(workspaceSlug);
  if (workspace == null) return notFound();

  return (
    <PolicyContextProvider workspaceId={workspace.id}>
      <div className="flex items-center border-b px-6 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={urls.workspace(workspaceSlug).policies().baseUrl()}>
                  <IconArrowLeft className="mr-2 h-4 w-4" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>Create New Policy</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-grow overflow-hidden">
        <PolicyCreationTabs workspaceId={workspace.id} />
      </div>

      <div className="flex items-center justify-between border-t px-6 py-4">
        <PolicySubmit workspaceSlug={workspaceSlug} />
      </div>
    </PolicyContextProvider>
  );
}
