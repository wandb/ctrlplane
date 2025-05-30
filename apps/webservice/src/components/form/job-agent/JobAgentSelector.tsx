"use client";

import type { JobAgent } from "@ctrlplane/db/schema";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";

import { cn } from "@ctrlplane/ui";
import { Button } from "@ctrlplane/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ctrlplane/ui/select";

import { urls } from "~/app/urls";

export const JobAgentSelectorInput: React.FC<{
  jobAgents: JobAgent[];
  value?: string;
  onChange: (v: string) => void;
}> = ({ jobAgents, value, onChange }) => (
  <Select
    value={value}
    onValueChange={onChange}
    disabled={jobAgents.length === 0}
  >
    <SelectTrigger>
      <SelectValue placeholder={jobAgents.length === 0 && "No agents found"} />
    </SelectTrigger>
    <SelectContent>
      {jobAgents.map((jobAgent) => (
        <SelectItem key={jobAgent.id} value={jobAgent.id}>
          {jobAgent.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export const JobAgentSelector: React.FC<{
  jobAgents: JobAgent[];
  workspace: { id: string; slug: string };
  value?: string;
  onChange: (v: string) => void;
  className?: string;
}> = ({ workspace, value, jobAgents, onChange, className }) => (
  <div className={cn("flex items-center gap-2", className)}>
    <JobAgentSelectorInput
      jobAgents={jobAgents}
      value={value}
      onChange={onChange}
    />
    <Link
      href={urls.workspace(workspace.slug).agents().integrations().baseUrl()}
      passHref
    >
      <Button className="flex items-center" variant="outline" size="icon">
        <IconPlus className="h-4 w-4" />
      </Button>
    </Link>
  </div>
);
