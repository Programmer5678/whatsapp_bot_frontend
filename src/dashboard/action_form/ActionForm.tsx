import React from 'react';
import './ActionForm.css';
import { LoadingDots } from '../../shared/components/LoadingDots';

interface ActionFormProps {
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isConnecting: boolean;
    responseSuccess: boolean | null;
}

export function ActionForm(props: ActionFormProps) {
    return (
        <form className="action-form" onSubmit={props.onSubmit}>
            <div className="action-form__header">
                <div className="action-form__title-row">
                    <span className="action-form__plus">+</span>
                    <span className="action-form__title">Create Mavdak</span>
                </div>

                <hr className="action-form__divider" />
            </div>

            <div className="action-form__content">
                {props.children}
            </div>

            {props.responseSuccess === false && (
                <div className="action-form__error">
                    Failed to fetch
                </div>
            )}

            {props.responseSuccess === true && (
                <div className="action-form__success">
                    Successfully created mavdak action!
                </div>
            )}

            <div className="action-form__footer">
                <button className="action-button primary">
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
