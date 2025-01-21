import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IconRocket } from "@tabler/icons-react";

import { api } from "~/trpc/server";
import { DeploymentsCard } from "./Card";

export const metadata: Metadata = {
  title: "Deployments | Ctrlplane",
};

export default async function DeploymentsPage({
  params,
}: {
  params: { workspaceSlug: string };
}) {
  const { workspaceSlug } = params;
  const workspace = await api.workspace.bySlug(workspaceSlug);
  if (workspace == null) notFound();
  return (
    <div>
      <div className="flex items-center gap-2 border-b px-2">
        <div className="flex items-center gap-2 p-3">
          <IconRocket className="h-4 w-4" /> Deployments
        </div>
      </div>

      <div className="container m-8 mx-auto">
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Billing</h2>
            <p className="text-sm text-muted-foreground">
              Monitor your usage costs, credits, and billing status
            </p>
          </div>
        </div>
        <DeploymentsCard workspaceId={workspace.id} />
      </div>
    </div>
  );
}
