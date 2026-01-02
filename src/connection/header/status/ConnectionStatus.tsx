import React from "react";
import "./ConnectionStatus.css";
import { ConnectionStatusType } from "../../../shared/api/types";

type ConnectionStatusProps = {
  // Current connection status returned from the backend
  connectionStatus: ConnectionStatusType;

  // Timestamp of the last successful status check (null if never checked)
  lastUpdated: Date | null;
};

export function ConnectionStatus(props: ConnectionStatusProps) {
  return (
    <div className="connection-status">
      {/* 
        Left status indicator dot:
        - Green when connected
        - Red otherwise (default styling)
      */}
      <div
        className={`connection-status__indicator ${
          props.connectionStatus === "connected" && "connected"
        }`}
      />

      <div className="connection-status__content">
        <div className="connection-status__title-row">
          {/* 
            Main connection label:
            - "Connected" when connectionStatus === "connected"
            - "Not Connected" for all other states
          */}
          <span className="connection-status__title">
            {props.connectionStatus === "connected"
              ? "Connected"
              : "Not Connected"}
          </span>

          {/* 
            Error badge:
            Shown only when the API itself could not be reached
            (connection check failed at the network / server level)
          */}
          {props.connectionStatus === "evolution_connection_error" && (
            <span className="connection-status__badge">
              API Unreachable
            </span>
          )}
        </div>

        {/* 
          Timestamp showing when the connection status was last received
          from the API (only shown if a value exists)
        */}
        <div className="connection-status__timestamp">
          {props.lastUpdated &&
            `As of ${props.lastUpdated.toLocaleDateString()}, ${props.lastUpdated.toLocaleTimeString()}`}
        </div>
      </div>
    </div>
  );
}
