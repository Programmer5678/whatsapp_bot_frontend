import React, { useState } from 'react';
import { ConnectionHeader } from '../connection/header/ConnectionHeader';
import { ConnectionPopUp } from '../connection/popup/ConnectionPopUp';
import './Dashboard.css';
import { Workspace } from './workspace/Workspace';

export function Dashboard() {
    const [isConnectionPopUpOpen, setIsConnectionPopUpOpen] = useState<boolean>(false);


    function closeConnectionPopUp() {
        setIsConnectionPopUpOpen(false);
    }

    function openConnectionPopUp() {
        setIsConnectionPopUpOpen(true);
    }


    return (
        <div style={{ position: 'relative', height: "100%" }}>

            <div id="main-content" className={isConnectionPopUpOpen ? 'fade-out' : ''}>
                <ConnectionHeader openConnectionPopUp={openConnectionPopUp} />

                {/* spacer */}
                <div style={{ height: "var(--spacing-md)" }} />

                <Workspace />
            </div>

            {/* 
                connection popup
                used for connecting to WhatsApp Web via QR code
            */}
            {isConnectionPopUpOpen && (
                <ConnectionPopUp closeConnectionPopUp={closeConnectionPopUp} />
            )}

        </div>
    );
}
