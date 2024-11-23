import { IconPlus } from "@tabler/icons-react";

import { Button } from "@ctrlplane/ui/button";

import { CreateSessionDialog } from "./CreateDialogSession";
import { LoadSessionFromParams } from "./LoadSessionFromParams";
import { SessionTerminals } from "./SessionTerminals";
import { TerminalSessionsProvider } from "./TerminalSessionsProvider";
import { TerminalTabs } from "./TerminalTabs";

export const metadata = {
  title: "Terminal",
};

export default function TerminalPage() {
  return (
    <TerminalSessionsProvider>
      <LoadSessionFromParams />
      <div className="flex h-[100vh] flex-col">
        <div className="flex h-9 items-center border-b px-2">
          <TerminalTabs />
          <div className="flex-grow" />

          <CreateSessionDialog>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <IconPlus className="h-5 w-5 text-neutral-400" />
            </Button>
          </CreateSessionDialog>
        </div>
        <div className="mt-4 h-full w-full flex-grow">
          <SessionTerminals />
        </div>
      </div>
    </TerminalSessionsProvider>
  );
}
