import React, { useState } from "react";
import { api } from "../../../shared/api/client" ;
import { QRCodeResponseModel } from "../../../shared/api/types";
import "./ConnectionForm.css";
import { Field } from "../../../shared/components/Field";

interface ConnectionFormProps {
    hide: boolean
    setQR: (qr: string) => void;
    closeConnectionPopUp: () => void;
}

export function ConnectionForm(props: ConnectionFormProps) {
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [APIKey, setAPIKey] = useState<string>("");
    const [isConnecting, setIsConnecting] = useState<boolean>(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsConnecting(true);

        try {
            const res: QRCodeResponseModel = await api.connect(phoneNumber, APIKey);
            props.setQR(res.qr_code);
        } catch (error) {
            console.error("Connection failed:", error);
            alert("Connection failed. Please check your inputs and try again.");
        } finally {
            setIsConnecting(false);
        }
    }

    return (
        <form 
            style={ props.hide ? { display: "none" } : {} }
            className={`connection-pop-up-body connection-form ${isConnecting ? "connection" : ""}`}
            onSubmit={handleSubmit}
        >
            <div className="connection-form__title">Connect WhatsApp</div>


            <Field label="Phone Number">
                <input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="9725XXXXXXXX"
                />
            </Field>

            {/* API key input */}
            <Field label="API Key">
                <input
                    value={APIKey}
                    onChange={(e) => setAPIKey(e.target.value)}
                    placeholder="You dont know this? you're done!"
                />
            </Field>

            {/* Buttons */}
            <div className="connection-form__actions">
                <button className="action-button default" type="button" onClick={props.closeConnectionPopUp}>
                    Cancel
                </button>

                <button
                    className="action-button primary"
                    type="submit"
                    style={{ pointerEvents: isConnecting ? "none" : "auto", display:"flex", flexDirection:"row" , gap: 0}}
                >
                    <span>{isConnecting ? "Connecting" : "Connect"}</span>

                    {isConnecting && (
                        <div className="loading-dots"><span className="loading-dots-placeholder">...</span></div>
                    )}
                </button>
            </div>
        </form>
    );
}
