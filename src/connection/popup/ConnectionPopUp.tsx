import React, { useState } from "react";
import "./ConnectionPopUp.css";
import { ConnectionForm } from "./form/ConnectionForm";
import { ConnectionQR } from "./qr/ConnectionQR";

export interface ConnectionPopUpProps {
  closeConnectionPopUp: () => void;
}

export function ConnectionPopUp(props: ConnectionPopUpProps) {
  const [QR, setQR] = useState<string | null>(null);

  return (
    <div className="connection-pop-up">
      {/* Show QR code if present */}
      {QR &&
        <ConnectionQR qrCode={QR} onBack={() => setQR(null)} />
      }
      <ConnectionForm hide={QR != null} setQR={setQR} closeConnectionPopUp={props.closeConnectionPopUp} />


      {/* Close button top-right */}
      <button
        type="button"
        className="connection-pop-up__control right"
        aria-label="Close"
        onClick={props.closeConnectionPopUp}
      >
        &times;
      </button>
    </div>
  );
}
