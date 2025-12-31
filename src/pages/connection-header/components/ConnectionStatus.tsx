import React from "react";
import "./ConnectionStatus.css";
import { ConnectionStatusType } from "../../../shared/api/types";

type ConnectionStatusProps = {
  connectionStatus: ConnectionStatusType;
  lastUpdated: Date | null;
};

export function ConnectionStatus(props: ConnectionStatusProps) {
  return (
    <div className="connection-status">
      <div className={`connection-status__indicator ${props.connectionStatus === "connected" && 'connected'}`} />  
      {/* Green if connected, red otherwise */}

      <div className="connection-status__content">
        <div className="connection-status__title-row">
          <span className="connection-status__title">
            {props.connectionStatus === "connected" ? "Connected" : "Not Connected"}
          </span>

          {props.connectionStatus === "evolution_connection_error" && (
            <span className="connection-status__badge">
              API Unreachable
            </span>
          )}
        </div>

        <div className="connection-status__timestamp">
          {props.lastUpdated && `As of ${props.lastUpdated.toLocaleDateString()}, ${props.lastUpdated.toLocaleTimeString()}`}
        </div>
      </div>
    </div>
  );
}
