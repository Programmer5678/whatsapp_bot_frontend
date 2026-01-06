import React, { useState } from 'react';
import './Mavdak.css';
import { Field } from '../../../shared/components/Field';
import { api } from '../../../shared/api/client';
import { MavdakRequestModel } from '../../../shared/api/types';
import { ActionForm } from '../ActionForm';
import { getTimeZoneSuffix } from '../../../shared/utils/timezone';

interface MavdakProps {
    isConnecting: boolean;
    setIsConnecting: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Mavdak(props: MavdakProps) {
    const [responseSuccess, setResponseSuccess] = useState<boolean | null>(null);

    const [form, setForm] = useState({
        base_date: '',
        deadline_mavdak_list: '',
        forms_link: '',
        iluzei_reaionot_mador_mavdak: '',
        group_participants: '',
    });

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

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    return (
        <ActionForm
            onSubmit={sendRequest}
            isConnecting={props.isConnecting}
            responseSuccess={responseSuccess}
        >
            <div className="mavdak-grid">
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
