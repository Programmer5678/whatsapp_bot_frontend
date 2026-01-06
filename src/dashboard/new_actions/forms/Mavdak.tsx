import React, { useState } from 'react';
import { Field } from '../../../shared/components/Field';
import { api } from '../../../shared/api/client';
import { MavdakRequestModel } from '../../../shared/api/types';
import { ActionForm } from '../shared/ActionForm';
import { getTimeZoneSuffix } from '../../../shared/utils/timezone';
import { genHandleInputChange } from '../shared/genHandleInputChange';

interface MavdakProps {
    /**
     * Indicates whether any action request is currently running.
     * Owned by NewActions so the entire actions area can be disabled.
     */
    isConnecting: boolean;

    /**
     * Setter passed down from NewActions.
     * Used to toggle global interactivity while a request is running.
     */
    setIsConnecting: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Mavdak
 *
 * This component represents the "Create Mavdak" action form.
 * It is responsible for:
 * - Managing mavdak-specific form state
 * - Handling user input
 * - Submitting the request to the API
 * - Reporting success / failure back to the UI
 */
export function Mavdak(props: MavdakProps) {
    /**
     * Result of the last submit attempt.
     *
     * - null   → no request made yet
     * - true   → request succeeded
     * - false  → request failed
     *
     * Used by ActionForm to show success/error messages.
     */
    const [responseSuccess, setResponseSuccess] = useState<boolean | null>(null);

    /**
     * Local form state for the mavdak action.
     * All inputs update this object via handleInputChange.
     */
    const [form, setForm] = useState({
        base_date: '',
        deadline_mavdak_list: '',
        forms_link: '',
        iluzei_reaionot_mador_mavdak: '',
        group_participants: '',
    });

    /**
     * Handles form submission.
     *
     * Flow:
     * 1. Set isConnecting = true to make the entire NewActions area non-interactive
     *    and switch the submit button to a loading state.
     * 2. Convert the local form state into the API request model.
     * 3. Send the request asynchronously.
     * 4. Set responseSuccess to true or false based on the result.
     * 5. Set isConnecting = false once the request finishes.
     */
    function sendRequest(e: React.FormEvent<HTMLFormElement>) {
        props.setIsConnecting(true);
        e.preventDefault();

        const requestBody: MavdakRequestModel = {
            ...form,
            group_participants: form.group_participants.split(','),
            deadline_mavdak_list: form.deadline_mavdak_list + getTimeZoneSuffix(),
        };

        async function request() {
            try {
                await api.createMavdak(requestBody);
                setResponseSuccess(true);
            } catch {
                setResponseSuccess(false);
            } finally {
                props.setIsConnecting(false);
            }
        }

        request();
    }

    /**
     * Handles input changes for all fields.
     *
     * Every input calls this function on change.
     * The function updates the corresponding field in the form state,
     * keeping the entire form object in sync with user input.
     */
    const handleInputChange = genHandleInputChange(setForm);

    return (
        <ActionForm
            onSubmit={sendRequest}
            isConnecting={props.isConnecting}
            responseSuccess={responseSuccess}
            header="Create Mavdak"
        >
            <div className="action-form-grid">
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
        </ActionForm>
    );
}
