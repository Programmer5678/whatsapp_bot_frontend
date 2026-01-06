import React, { useEffect, useState } from 'react';
import './NewActions.css';
import { warnTimeZone } from '../../../shared/utils/timezone';
import { Mavdak } from '../forms/Mavdak';

export function NewActions() {
    const [isConnecting, setIsConnecting] = useState<boolean>(false);

    useEffect(() => {
        warnTimeZone();
    }, []);

    return (
        <div className={isConnecting ? 'new-actions disabled' : 'new-actions'}>
            {/* Header */}
            <div className="new-actions-header">
                <div className="new-actions-title">
                    Create New Action
                </div>
                <div className="new-actions-subtitle">
                    Select an action type to configure and launch automation.
                </div>
            </div>

            <div className="new-actions-spacer-lg" />

            {/* Action buttons */}
            <div className="new-actions-grid">
                <button className="action-button default">Raf0</button>
                <button className="action-button default">Mavdak</button>
                <button className="action-button default">Hakhana</button>
                <button className="action-button default">Veadat Keva</button>
            </div>

            <div className="new-actions-spacer-md" />

            <Mavdak
                isConnecting={isConnecting}
                setIsConnecting={setIsConnecting}
            />
        </div>
    );
}
