import React, { useState } from "react";
import "./ConnectionPopUp.css";
import { api } from "../../shared/api/client";

export interface ConnectionPopUpProps {
  closeConnectionPopUp : () => void;
}


export function ConnectionPopUp(props : ConnectionPopUpProps) {
  // Controlled inputs: phone number and API key
  const [phoneNumber, setPhoneNumber] = useState("");
  const [APIKey, setAPIKey] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // stops page reload
    api.connect(phoneNumber, APIKey)

  }

  return (
    <form className="connection-popup" onSubmit={handleSubmit}>
      {/* Popup title */}
      <div className="connection-popup__title">
        Connect WhatsApp
      </div>

      {/* Phone number input (controlled) */}
      <label className="connection-popup__field">
        <span className="connection-popup__label">Phone Number</span>
        <input
          className="connection-popup__input"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="9725XXXXXXXX"
        />
      </label>

      {/* API key input (controlled) */}
      <label className="connection-popup__field">
        <span className="connection-popup__label">API Key</span>
        <input
          className="connection-popup__input"
          value={APIKey}
          onChange={(e) => setAPIKey(e.target.value)}
          placeholder="You dont know this? you're done!"
        />
      </label>

      {/* Submit row aligned to the right */}
      <div className="connection-popup__actions">
        {/* Styled using shared ActionButton styles */}
        <button
          className="action-button primary"
          type="submit"

        >
          <span>Connect</span>
        </button>

      </div>


      {/* Close button in the top-right corner of the popup */}
      {/* IMPORTANT: type="button" so it does NOT submit the form */}
      <button
        type="button"
        className="connection-popup__close"
        aria-label="Close"
        onClick={props.closeConnectionPopUp}
      >
        &times;
      </button>
    </form>
  );
}
