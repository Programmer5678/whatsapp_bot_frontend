import React, { useEffect } from "react";
import "./styles/ConnectionHeader.css";
import { ConnectionStatus } from "./components/ConnectionStatus";
import { ActionButton } from "./components/ActionButton";
import { useState } from "react";
import { ConnectionStateResponse, ConnectionStatusType } from "../../shared/api/types";
import { api } from "../../shared/api/client";



export function ConnectionHeader() {

  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatusType>("evolution_connection_error");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function fetchAndUpdateConnectionStatus() {

    if (isLoading) {
      console.log("Currently loading, skipping fetch.");
      return; // Prevent overlapping requests
    }


    setIsLoading(true);

    async function fetchConnectionStatus() {

      console.log("getConnectionState called");
      const response : ConnectionStateResponse = await api.getConnectionState();
      const status = response.status;
      setConnectionStatus(() => status);
      setLastUpdated(() => new Date());

      setIsLoading(false);
      console.log("Connection status updated:", status);
    }

    fetchConnectionStatus();

  }


  useEffect(() => { // Get connection status every 30 seconds, including on mount
      
      const intervalId = setInterval(fetchAndUpdateConnectionStatus, 30000);
      fetchAndUpdateConnectionStatus();     

      return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="connection-header">
      <ConnectionStatus connectionStatus={connectionStatus} lastUpdated={lastUpdated} />

      <div className="connection-header__actions">
        <div onClick={fetchAndUpdateConnectionStatus}>
          <ActionButton icon="&#x21bb;" label="Refresh"/>
        </div>
        <ActionButton icon="&#x1F4F1;" label="Reconnect" variant="primary" />
      </div>
    </header>
  );
}
