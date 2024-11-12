import React, { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

import { useSessionTerminal } from "~/components/xterm/SessionTerminal";

export const SessionTerminal: React.FC<{ sessionId: string }> = ({
  sessionId,
}) => {
  console.log(sessionId);
  const { getWebSocket, readyState } = useWebSocket(
    `/api/v1/target/proxy/session/${sessionId}`,
  );

  const { terminalRef, divRef, fitAddon } = useSessionTerminal(
    getWebSocket,
    readyState,
  );

  useEffect(() => {
    if (readyState !== ReadyState.OPEN) return;
    if (terminalRef.current == null) return;
    terminalRef.current.focus();
    fitAddon.fit();
  }, [getWebSocket, terminalRef, fitAddon, readyState]);

  return (
    <div>
      <div className="h-full w-full">
        <div ref={divRef} className="h-full w-full" />
      </div>
    </div>
  );
};
