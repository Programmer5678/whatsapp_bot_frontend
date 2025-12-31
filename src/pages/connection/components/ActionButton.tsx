import React from "react";
import "./ActionButton.css";

type ActionButtonProps = {
  icon: string;
  label: string;
  variant?: "default" | "primary";
  click?: () => void;
  icon_class?: string;
};

export function ActionButton(props: ActionButtonProps) {

  return (
    <button
      className={`action-button ${props.variant ?? "default"}`}
      onClick={props.click ?? (() => {})}
    >
      <span className={`action-button__icon ${props.icon_class ?? ""}`}>
        {props.icon}
      </span>
      <span>{props.label}</span>
    </button>
  );
}


