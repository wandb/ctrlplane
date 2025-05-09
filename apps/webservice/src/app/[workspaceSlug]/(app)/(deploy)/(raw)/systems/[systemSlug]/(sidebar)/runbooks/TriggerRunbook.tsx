"use client";

import type { RouterOutputs } from "@ctrlplane/api";
import type { ReactNode } from "react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@ctrlplane/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ctrlplane/ui/dialog";
import { Input } from "@ctrlplane/ui/input";
import { Label } from "@ctrlplane/ui/label";

import { api } from "~/trpc/react";
import { VariableDeploymentInput } from "./_components/variables/VariableDeploymentInput";
import { VariableEnvironmentInput } from "./_components/variables/VariableEnvironmentInput";
import {
  VariableBooleanInput,
  VariableChoiceSelect,
  VariableStringInput,
} from "./_components/variables/VariableInputs";
import { VariableResourceInput } from "./_components/variables/VariableResourceInput";

export type TriggerRunbookDialogProps = {
  runbook: RouterOutputs["runbook"]["bySystemId"][number];
  onSuccess: () => void;
  children: ReactNode;
};

export const TriggerRunbookDialog: React.FC<TriggerRunbookDialogProps> = ({
  runbook,
  onSuccess,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const trigger = api.runbook.trigger.useMutation();
  const [variables, setVariables] = useState<Record<string, any>>({});
  const router = useRouter();

  const handleTriggerRunbook = () =>
    trigger
      .mutateAsync({ runbookId: runbook.id, variables })
      .then(() => setVariables({}))
      .then(() => router.refresh())
      .then(() => onSuccess())
      .then(() => setOpen(false));

  const getValue = (k: string) => variables[k];
  const onChange = (k: string) => (v: string) =>
    setVariables((a) => ({ ...a, [k]: v }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Trigger Runbook: {runbook.name}</DialogTitle>
          <DialogDescription>
            Fill in the parameters below to trigger the runbook.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {runbook.variables.map((v) => (
            <div key={v.id} className="space-y-2">
              <Label>{v.name}</Label>
              {v.config?.type === "string" && (
                <VariableStringInput
                  {...v.config}
                  value={getValue(v.key) ?? ""}
                  onChange={onChange(v.key)}
                />
              )}

              {v.config?.type === "number" && (
                <Input
                  type="number"
                  value={getValue(v.key) ?? ""}
                  onChange={(e) => onChange(v.key)(e.target.value)}
                />
              )}

              {v.config?.type === "choice" && (
                <VariableChoiceSelect
                  {...v.config}
                  value={getValue(v.key) ?? ""}
                  onSelect={onChange(v.key)}
                />
              )}

              {v.config?.type === "boolean" && (
                <VariableBooleanInput
                  {...v.config}
                  value={getValue(v.key) ?? false}
                  onChange={(val) => onChange(v.key)(val.toString())}
                />
              )}

              {v.config?.type === "resource" && (
                <VariableResourceInput
                  {...v.config}
                  value={getValue(v.key) ?? ""}
                  onChange={onChange(v.key)}
                />
              )}

              {v.config?.type === "environment" && (
                <VariableEnvironmentInput
                  {...v.config}
                  value={getValue(v.key) ?? ""}
                  onChange={onChange(v.key)}
                />
              )}

              {v.config?.type === "deployment" && (
                <VariableDeploymentInput
                  {...v.config}
                  value={getValue(v.key) ?? ""}
                  onChange={onChange(v.key)}
                />
              )}

              {v.description !== "" && (
                <div className="text-xs text-muted-foreground">
                  {v.description}
                </div>
              )}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="secondary">Cancel</Button>
          <Button onClick={handleTriggerRunbook}>Trigger</Button>
        </DialogFooter>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};
