import React, { useState } from "react";

export function ConnectionPopUp() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [APIKey, setAPIKey] = useState<string>("");

  return (
    <form
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "400px",
        height: "300px",
        transform: "translate(-50%, -50%)",
        backgroundColor: "black",
        padding: "var(--spacing-lg)",
        display: "flex",
        flexDirection : "column",
        gap: "var(--spacing-md)"
      }}
    >
      <div style={{fontSize:"20px", fontWeight:"bold"}}>Connect Whatsapp</div>

      <label style={{display:"flex", flexDirection:"column"}}>
        Phone Number
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{ padding:"var(--spacing-md)", backgroundColor:"yellow", border:"1px solid", borderRadius:"var(--radius-md)" }}
        />
      </label>

      <label style={{display:"flex", flexDirection:"column"}}>
        API Key
        <input 
          value={APIKey}
          onChange={(e) => setAPIKey(e.target.value)}
        />
      </label>

      <div style={{display:"flex", justifyContent:"flex-end"}}>

      <button>
        Submit
      </button>

      </div>

    </form>
  );
}
