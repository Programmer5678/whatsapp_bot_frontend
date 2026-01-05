import React, { useEffect, useState } from 'react';
import './NewActions.css';
import { Field } from '../shared/components/Field';
import { api } from '../shared/api/client';
import { MavdakRequestModel } from '../shared/api/types';
import { LoadingDots } from '../shared/components/LoadingDots';

function getTimeZoneSuffix(): string {

    const offset: number = - (new Date().getTimezoneOffset());
    const sign: string = offset > 0 ? '+' : '-';
    const offsetHours: string = Math.floor(Math.abs(offset) / 60).toString().padStart(2, '0');
    const offsetMinutes: string = (Math.abs(offset) % 60).toString().padStart(2, '0');

    return `${sign}${offsetHours}:${offsetMinutes}`;
}

function warnTimeZone() {

    const timeZoneSuffix = getTimeZoneSuffix();

    if (timeZoneSuffix != '+02:00' && timeZoneSuffix != '+03:00') {
        alert(`Warning. Timezone ${timeZoneSuffix} is not Israel - impacts inputs!`)
    }
}

export function NewActions() {

    const [form, setForm] = useState
        <{
            base_date: string,
            deadline_mavdak_list: string,
            forms_link: string,
            iluzei_reaionot_mador_mavdak: string,
            group_participants: string
        }>
        ({
            base_date: "",
            deadline_mavdak_list: "",
            forms_link: "",
            iluzei_reaionot_mador_mavdak: "",
            group_participants: ""
        });

    const [isConnecting, setIsConnecting] = useState<boolean>(false);

    const [responseSuccess, setResponseSuccess] = useState<boolean | null>(null);

    useEffect(warnTimeZone, [])

    function sendRequest(e: React.FormEvent<HTMLFormElement>) {

        setIsConnecting(true);

        e.preventDefault();

        const requestBody: MavdakRequestModel = {
            ...form,
            group_participants: form.group_participants.split(","),
            deadline_mavdak_list: form.deadline_mavdak_list + getTimeZoneSuffix(),
        };

        console.log(requestBody);

        async function request(){

            try{
                await api.createMavdak( requestBody );
                setResponseSuccess( true ); 
            }
            catch{
                setResponseSuccess( false );
            }
            finally{
            setIsConnecting(false);
            }
        }

        request();

    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        e.preventDefault();

        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };



    return (
        <div style={isConnecting ? { pointerEvents: "none", opacity: "0.8" } : {}}>
            {/* header */}
            <div className="new-actions-header">
                <div className="new-actions-title">
                    Create New Action
                </div>
                <div className="new-actions-subtitle">
                    Select an action type to configure and launch automation.
                </div>
            </div>

            {/* spacer */}
            <div style={{ height: "var(--spacing-lg)" }} />

            {/* action buttons */}
            <div className="new-actions-grid">
                <button className="action-button default" style={{ fontSize: "var(--font-mdl)" }}>Raf0</button>
                <button className="action-button default" style={{ fontSize: "var(--font-mdl)" }}>Mavdak</button>
                <button className="action-button default" style={{ fontSize: "var(--font-mdl)" }}>Hakhana</button>
                <button className="action-button default" style={{ fontSize: "var(--font-mdl)" }}>Veadat Keva</button>
            </div>

            {/* spacer */}
            <div style={{ height: "var(--spacing-md)" }} />


            <form style={{
                border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", padding: "var(--spacing-lg)",
                display: "flex", flexDirection: "column", gap: "var(--spacing-lg)",
            }}
                onSubmit={sendRequest}
            >

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
                    <div style={{ display: "flex", gap: "var(--spacing-sm)", alignItems: "center" }}>
                        <span style={{ color: "var(--text-tertiary)" }}>+</span>
                        <span style={{ fontSize: "var(--font-lg)" }}>Create Mavdak</span>
                    </div>

                    <hr style={{ height: "1px", backgroundColor: "var(--text-tertiary)", border: 0, width: "100%" }}></hr>

                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "var(--spacing-md)",
                            width: "100%",
                        }}
                    >
                        <Field label="Base Date">
                            <input
                                type="date"
                                name="base_date"
                                onChange={handleInputChange}
                                required
                            />
                        </Field>

                        <Field label="Deadline">
                            <input
                                type="datetime-local"
                                name="deadline_mavdak_list"
                                onChange={handleInputChange}
                                required
                            />
                        </Field>
                    </div>

                    <Field label="Forms Link">
                        <input
                            type="url"
                            name="forms_link"
                            placeholder="https://..."
                            onChange={handleInputChange}
                            required
                        />
                    </Field>

                    <Field label="Iluzei Reaionot">
                        <input
                            name="iluzei_reaionot_mador_mavdak"
                            placeholder="message of iluzei reaionot"
                            onChange={handleInputChange}
                            required
                        />
                    </Field>

                    <Field label="Participants (comma separated phone numbers)">
                        <input
                            pattern="[\s\t]*(9725[0-9]{8}[\s\t,]*)*"
                            name="group_participants"
                            placeholder="972533332224, 972533972298,..."
                            onChange={handleInputChange}
                            required
                        />
                    </Field>

                </div>

                {
                    responseSuccess == false

                    &&

                    <div style={{
                        backgroundColor: "var(--error-bg)", color: "var(--error-text)", border: "1px solid var(--error)",
                        borderRadius: "var(--radius-md)", padding: "var(--spacing-sm)", fontSize: "var(--font-mdl)"
                    }}>
                        Failed to fetch
                    </div>

                }

                {
                    responseSuccess == true

                    &&

                    <div style={{
                        backgroundColor: "var(--success-bg)", color: "var(--success-text)", border: "1px solid var(--success)",
                        borderRadius: "var(--radius-md)", padding: "var(--spacing-sm)", fontSize: "var(--font-mdl)"
                    }}>
                        Successfully created mavdak action!
                    </div>

                }



                <div style={{ display: "flex", justifyContent: "flex-end" }}>

                    <button className="action-button primary">
                        {isConnecting ?
                            (
                                <div style={{ display: "flex", gap: 0 }}>
                                    Loading
                                    <LoadingDots />
                                </div>
                            )
                            : (
                                <>
                                    <div>&#10148;</div>
                                    <div>Create Action</div>
                                </>
                            )
                        }
                    </button>

                </div>

            </form>

        </div>
    );
}
