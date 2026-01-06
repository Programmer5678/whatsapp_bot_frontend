import React from 'react';
import './ActionForm.css';
import { LoadingDots } from '../../../shared/components/LoadingDots';

interface ActionFormProps {
    /**
     * Form fields passed from a specific action (e.g. Mavdak).
     *
     * Usage:
     * <ActionForm ...>
     *   <Field ... />
     *   <Field ... />
     * </ActionForm>
     */
    children: React.ReactNode;

    /**
     * Submit handler provided by the specific action form.
     * Responsible for:
     * - Sending the request
     * - Setting responseSuccess
     * - Controlling isConnecting
     */
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;

    /**
     * Indicates whether a request is currently running.
     * Used to disable interactions and switch the submit button
     * between "Create Action" and a loading state.
     */
    isConnecting: boolean;

    /**
     * Result of the last submit attempt.
     *
     * - null   → no submission yet (no message shown)
     * - true   → success (green success box shown)
     * - false  → failure (red error box shown)
     *
     * This value is controlled by the onSubmit function.
     */
    responseSuccess: boolean | null;

    header: string; 
}

export function ActionForm(props: ActionFormProps) {
    return (
        <form className="action-form" onSubmit={props.onSubmit}>
            {/*
                Form header
                Shared across all action forms (e.g. Mavdak, Raf0, etc.)
            */}
            <div className="action-form__header">
                <div className="action-form__title-row">
                    <span className="action-form__plus">+</span>
                    <span className="action-form__title">{props.header}</span>
                </div>

                <hr className="action-form__divider" />
            </div>

            {/*
                Action-specific form fields.
                These are provided by the parent action component.
            */}
            <div className="action-form__content">
                {props.children}
            </div>

            {/*
                Error message shown when the submit request fails
            */}
            {props.responseSuccess === false && (
                <div className="action-form__error">
                    Failed to fetch
                </div>
            )}

            {/*
                Success message shown when the submit request succeeds
            */}
            {props.responseSuccess === true && (
                <div className="action-form__success">
                    Successfully created action!
                </div>
            )}

            {/*
                Submit button
                - Uses type="submit" to trigger the form submit handler
                - Shows loading state while isConnecting is true
            */}
            <div className="action-form__footer">
                <button type="submit" className="action-button primary">
                    {props.isConnecting ? (
                        <div className="action-form__loading">
                            Loading
                            <LoadingDots />
                        </div>
                    ) : (
                        <>
                            <div>&#10148;</div>
                            <div>Create Action</div>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
