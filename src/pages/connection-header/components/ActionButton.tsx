import React from "react";
import "./ActionButton.css";

export function ActionButton({ icon, label, variant = "default" }) {
  return (
    <button className={`action-button ${variant}`}>
      <span className="action-button__icon">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
