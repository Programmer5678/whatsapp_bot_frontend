import React from 'react';
import './NewActions.css';
import { Field } from '../shared/components/Field';

export function NewActions() {
    return (
        <>
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

            <form style={{ border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", padding: "var(--spacing-md)" }}>
                <div>+ Create Mavdak</div>
                <hr style={{ height: "1px", backgroundColor: "var(--border-color)", width: "100%" }}></hr>

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>

                    {/* <div>
                        <label style={{ fontSize: "var(--font-mdl)" }}>
                            Base Date
                            <input type="date"></input>
                        </label>

                        <label style={{ fontSize: "var(--font-mdl)" }}>
                            Deadline
                            <input type="date"></input>
                        </label>

                    </div> */}

                    {/* <label style={{ fontSize: "var(--font-mdl)" }}>
                        Forms Link
                        <input type="text" placeholder="https://..."></input>
                    </label> */}

                    {/* <label style={{ fontSize: "var(--font-mdl)" }}>
                        Participants( comma seperated phone numbers )
                        <input type="text" placeholder="972533332224, 972533972298,..."></input>
                    </label> */}




                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--spacing-md)", width: "100%" }}>
                        <Field label="Base Date">

                            <input
                                type="date"
                                placeholder="https://..."
                            />
                        </Field>

                        <Field label="Deadline Date">

                            <input
                                type="date"
                                placeholder="https://..."
                                style={{
                                    padding: "var(--spacing-sm)",
                                    borderRadius: "var(--radius-md)",
                                    border: "1px solid var(--border-color)",
                                    boxShadow: "var(--shadow-lg)",
                                }}
                            />
                        </Field>

                    </div>



                    <Field label="Forms Link">
                        <input
                            placeholder="https://..."
                            style={{
                                padding: "var(--spacing-sm)",
                                borderRadius: "var(--radius-md)",
                                border: "1px solid var(--border-color)",
                                boxShadow: "var(--shadow-lg)",
                            }}
                        />
                    </Field>

                    <Field label="Forms link)">
                        <input
                            placeholder="https://..."
                            style={{
                                padding: "var(--spacing-sm)",
                                borderRadius: "var(--radius-md)",
                                border: "1px solid var(--border-color)",
                                boxShadow: "var(--shadow-lg)",
                            }}
                        />
                    </Field>

                    <Field label="Iluzei Reaionot">
                        <input
                            placeholder="You dont know this? you're done!"
                            style={{
                                padding: "var(--spacing-sm)",
                                borderRadius: "var(--radius-md)",
                                border: "1px solid var(--border-color)",
                                boxShadow: "var(--shadow-lg)",
                            }}
                        />
                    </Field>    
                    <Field label="Participants (comma separated phone numbers)">
                        <input
                            placeholder="972533332224, 972533972298,..."
                            style={{
                                padding: "var(--spacing-sm)",
                                borderRadius: "var(--radius-md)",
                                border: "1px solid var(--border-color)",
                                boxShadow: "var(--shadow-lg)",
                            }}
                        />
                    </Field>

                </div>

                <button>
                    <div>&#10148;</div>
                    <div>Create Action</div>
                </button>

            </form>

        </>
    );
}
