import React, { useState } from "react";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { capitalCase } from "change-case";
import { format } from "date-fns";
import { useCopyToClipboard } from "react-use";

import { Button } from "@ctrlplane/ui/button";
import { toast } from "@ctrlplane/ui/toast";
import { ReservedMetadataKey } from "@ctrlplane/validators/conditions";
import { JobStatusReadable } from "@ctrlplane/validators/jobs";

import type { Job } from "./Job";
import { JobTableStatusIcon } from "../JobTableStatusIcon";

type JobPropertiesTableProps = { job: Job };

export const JobPropertiesTable: React.FC<JobPropertiesTableProps> = ({
  job,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [, copy] = useCopyToClipboard();
  const handleCopy = () => {
    copy(job.job.id);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
    toast.success("Job ID copied to clipboard");
  };

  const linksMetadata = job.job.metadata[ReservedMetadataKey.Links];

  const links =
    linksMetadata != null
      ? (JSON.parse(linksMetadata) as Record<string, string>)
      : null;

  return (
    <div className="space-y-2">
      <div className="text-sm">Properties</div>
      <table width="100%" className="table-fixed text-xs">
        <tbody>
          <tr>
            <td className="w-[110px] p-1 pr-2 text-muted-foreground">
              Job Status
            </td>
            <td>
              <div className="flex items-center gap-2">
                <JobTableStatusIcon
                  status={job.job.status}
                  className="h-3 w-3"
                />
                {JobStatusReadable[job.job.status]}
              </div>
            </td>
          </tr>
          <tr>
            <td className="w-[110px] p-1 pr-2 text-muted-foreground">ID</td>
            <td>
              <div className="flex items-center gap-1 ">
                {job.job.id.slice(0, 8)}...
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  className="h-4 w-4 backdrop-blur-sm transition-all hover:bg-neutral-950 focus-visible:ring-0"
                >
                  {isCopied ? (
                    <IconCheck className="h-3 w-3 bg-neutral-950 text-green-500" />
                  ) : (
                    <IconCopy className="h-3 w-3" />
                  )}
                </Button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="w-[110px] p-1 pr-2 text-muted-foreground">
              Environment
            </td>
            <td>{job.environment.name}</td>
          </tr>
          <tr>
            <td className="w-[110px] p-1 pr-2 text-muted-foreground">
              Deployment
            </td>
            <td>{capitalCase(job.deploymentVersion.deployment.name)}</td>
          </tr>
          <tr>
            <td className="w-[110px] p-1 pr-2 text-muted-foreground">
              Version
            </td>
            <td>{job.deploymentVersion.name}</td>
          </tr>
          {job.causedBy != null && (
            <tr>
              <td className="w-[110px] p-1 pr-2 text-muted-foreground">
                Caused by
              </td>
              <td>{job.causedBy.name}</td>
            </tr>
          )}
          <tr>
            <td className="w-[110px] p-1 pr-2 text-muted-foreground">
              Created at
            </td>
            <td>{format(job.job.createdAt, "MMM d, yyyy 'at' h:mm a")}</td>
          </tr>

          <tr>
            <td className="w-[110px] p-1 pr-2 text-muted-foreground">
              Updated at
            </td>
            <td>{format(job.job.updatedAt, "MMM d, yyyy 'at' h:mm a")}</td>
          </tr>

          <tr>
            <td className="p-1 pr-2 align-top text-muted-foreground">Links</td>
            <td>
              {links == null ? (
                <span className="cursor-help italic text-gray-500">
                  Not set
                </span>
              ) : (
                <div className="pt-1">
                  {Object.entries(links).map(([name, url]) => (
                    <a
                      key={name}
                      referrerPolicy="no-referrer"
                      href={url}
                      className="inline-block w-full overflow-hidden text-ellipsis text-nowrap text-blue-300 hover:text-blue-400"
                    >
                      {name}
                    </a>
                  ))}
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
