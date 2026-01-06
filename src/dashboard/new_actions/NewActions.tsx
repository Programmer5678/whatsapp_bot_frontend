import React, { useEffect, useState } from 'react';
import './NewActions.css';
import { warnTimeZone } from '../../shared/utils/timezone';
import { Mavdak } from './forms/Mavdak';

/**
 * NewActions
 *
 * This component is the entry point for creating new WhatsApp automation actions.
 * It is responsible for starting different actions such as:
 * - Creating a Mavdak
 * - Creating a Raf0 group
 * - Other future WhatsApp-based workflows
 *
 * The `isConnecting` state is intentionally owned here (and not deeper in the tree)
 * so that the entire actions area becomes non-interactive while a request is running.
 * This prevents the user from interacting with other actions or inputs
 * during an in-flight API request.
 */
export function NewActions() {
    const [isConnecting, setIsConnecting] = useState<boolean>(false);

    /**
     * Warn the user if their local timezone is not Israel,
     * since date/time inputs are timezone-sensitive.
     */
    useEffect(() => {
        warnTimeZone();
    }, []);

    return (
        <div className={isConnecting ? 'new-actions disabled' : 'new-actions'}>
            {/* 
                Header section
                Provides context for the user about creating new WhatsApp actions
            */}
            <div className="new-actions-header">
                <div className="new-actions-title">
                    Create New Action
                </div>
                <div className="new-actions-subtitle">
                    Select an action type to configure and launch automation.
                </div>
            </div>

            <div className="new-actions-spacer-lg" />

            {/*
                Action selection buttons
                These buttons are used to select which action form is shown
                (e.g. Mavdak, Raf0, Hakhana, etc.)
            */}
            <div className="new-actions-grid">
                <button className="action-button default">Raf0</button>
                <button className="action-button default">Mavdak</button>
                <button className="action-button default">Hakhana</button>
                <button className="action-button default">Veadat Keva</button>
            </div>

            <div className="new-actions-spacer-md" />

            {/*
                Action form
                Mavdak is one specific WhatsApp action form.
                Additional action forms will be conditionally rendered here
                based on the selected action.
            */}
            <Mavdak
                isConnecting={isConnecting}
                setIsConnecting={setIsConnecting}
            />
        </div>
    );
}
