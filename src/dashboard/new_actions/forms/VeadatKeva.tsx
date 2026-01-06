import React, { useState } from 'react';
import { Field } from '../../../shared/components/Field';
import { api } from '../../../shared/api/client';
import { HakhanaRequestModel, Raf0RequestModel, VeadatKevaRequestModel } from '../../../shared/api/types';
import { ActionForm } from '../shared/ActionForm';
import { getTimeZoneSuffix } from '../../../shared/utils/timezone';
import { genHandleInputChange } from '../shared/genHandleInputChange';

interface VeadatKevaProps {
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


export function VeadatKeva(props: VeadatKevaProps) {
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
        date: '',
        deadline: '',
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

        const requestBody: VeadatKevaRequestModel = {
            ...form,
            group_participants: form.group_participants.split(','),
            deadline: form.deadline + getTimeZoneSuffix(),
        };

        async function request() {
            try {
                await api.createVeadatKeva(requestBody);
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
            header={"Create Veadat Keva(Doesnt Work for now)"}
        >

            <div className="action-form-grid">
                <Field label="Date">
                    <input
                        type="date"
                        name="date"
                        onChange={handleInputChange}
                        required
                    />
                </Field>

                <Field label="Deadline">
                    <input
                        type="datetime-local"
                        name="deadline"
                        onChange={handleInputChange}
                        required
                    />
                </Field>
            </div>

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
