import { ReactFlowProvider } from "~/app/[workspaceSlug]/(app)/_components/reactflow/ReactFlowProvider";
import { api } from "~/trpc/server";
import { DeleteNodeDialogProvider } from "./DeleteNodeDialog";
import { EnvFlowBuilder } from "./EnvFlowBuilder";
import { PanelProvider } from "./SidepanelContext";

export default async function PoliciesPage(props: {
  params: Promise<{ workspaceSlug: string; systemSlug: string }>;
}) {
  const params = await props.params;
  const sys = await api.system.bySlug(params);
  const envs = await api.environment.bySystemId(sys.id);
  const policies = await api.environment.policy.bySystemId(sys.id);
  const policyDeployments = await api.environment.policy.deployment.bySystemId(
    sys.id,
  );
  return (
    <PanelProvider>
      <DeleteNodeDialogProvider>
        <ReactFlowProvider>
          <div className="h-[calc(100vh-53px)]">
            <EnvFlowBuilder
              systemId={sys.id}
              envs={envs}
              policies={policies}
              policyDeployments={policyDeployments}
            />
          </div>
        </ReactFlowProvider>
      </DeleteNodeDialogProvider>
    </PanelProvider>
  );
}
