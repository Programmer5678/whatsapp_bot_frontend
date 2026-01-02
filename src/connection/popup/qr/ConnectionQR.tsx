import React from "react";
import "./ConnectionQR.css";

interface ConnectionQRProps {
  qrCode: string;
  onBack: () => void;
}

export function ConnectionQR(props: ConnectionQRProps) {
  return (
    <div className="connection-pop-up-body connection-qr">

      <div className="connection-qr__qr-wrapper">
        <img
          src={props.qrCode}
          alt="QR Code"
          className="connection-qr__qr-image"
        />
      </div>

      <button
        onClick={props.onBack}
        className="connection-pop-up__control left"
        aria-label="Back"
      >
        &#8617;
      </button>
    </div>
  );
}
