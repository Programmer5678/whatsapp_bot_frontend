import React, { useEffect } from "react";
import "./ConnectionHeader.css";
import { ConnectionStatus } from "./status/ConnectionStatus";
import { useState } from "react";
import { ConnectionStateResponse, ConnectionStatusType } from "../../shared/api/types";
import { api } from "../../shared/api/client";
import "../../shared/styles/ActionButton.css";


export interface ConnectionHeaderProps {
  openConnectionPopUp: () => void;
}

export function ConnectionHeader(props: ConnectionHeaderProps) {
  // Last known connection status returned from the API
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatusType>("evolution_connection_error");

  // Timestamp of when the connection status was last received
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Whether a connection-status request is currently in progress
  // Used to prevent overlapping API calls
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Public entry point for refreshing connection status.
   * Can be triggered:
   * - Automatically on an interval
   * - Manually via the Refresh button
   *
   * Guards against concurrent requests using isLoading.
   */
  function fetchAndUpdateConnectionStatus() {
    if (isLoading) {
      console.log("Currently loading, skipping fetch.");
      return; // Prevent overlapping requests
    }

    setIsLoading(true);

    /**
     * Performs the actual async API call and updates all
     * related state once the response is received.
     */
    async function fetchConnectionStatus() {
      console.log("getConnectionState called");

      const response: ConnectionStateResponse =
        await api.getConnectionState();

      const status = response.status;

      // Update connection status returned by backend
      setConnectionStatus(() => status);

      // Record when the status was received
      setLastUpdated(() => new Date());

      // Mark request as completed
      setIsLoading(false);

      console.log("Connection status updated:", status);
    }

    fetchConnectionStatus();
  }

  /**
   * Effect lifecycle:
   * - Fetch connection status immediately on mount
   * - Continue polling every 30 seconds
   * - Clean up interval on unmount
   */
  useEffect(() => {
    const intervalId = setInterval(fetchAndUpdateConnectionStatus, 30_000);

    // Initial fetch on mount
    fetchAndUpdateConnectionStatus();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="connection-header">
      {/* 
        Displays:
        - Connection state (connected / not connected)
        - API error badge if unreachable
        - Timestamp of last successful status fetch
      */}
      <ConnectionStatus
        connectionStatus={connectionStatus}
        lastUpdated={lastUpdated}
      />

      <div className="connection-header__actions">


        {/* Manual refresh trigger if loading - */}

        {/* rotates while loading */}

        <button
          className={`action-button default`}
          onClick={fetchAndUpdateConnectionStatus}
        >
          <span className={`action-button__icon ${isLoading ? "rotate" : ""}`}>
            &#x21bb;
          </span>
          <span>Refresh</span>

        </button>

        {/* Future reconnect action */}
        <button
          className={`action-button primary`}
          onClick={props.openConnectionPopUp}
        >
          <span className={`action-button__icon}`}>
            &#x1F4F1;
          </span>
          <span>Reconnect</span>

        </button>


      </div>
    </header>
  );
}
