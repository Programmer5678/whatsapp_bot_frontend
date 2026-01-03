import React from 'react';
import { ConnectionHeader } from '../connection/header/ConnectionHeader';
import { ConnectionPopUp } from '../connection/popup/ConnectionPopUp';
import { useState } from 'react';
import './Dashboard.css';

export function Dashboard() {

    const [isConnectionPopUpOpen, setIsConnectionPopUpOpen] = useState<boolean>(false);

    function closeConnectionPopUp() {
        setIsConnectionPopUpOpen((isConnectionPopUpOpen) => false);
    }

    function openConnectionPopUp() {
        setIsConnectionPopUpOpen((isConnectionPopUpOpen) => true);
    }

    return (

        <div style={{ position: 'relative', height: "100%" }}>

            <div id="main-content" className={isConnectionPopUpOpen ? 'fade-out' : ''}>
                <ConnectionHeader openConnectionPopUp={openConnectionPopUp} />

                <div className="switcher-container">
                    <div className="switcher-item unselected">
                        <span>✚</span>
                        <span>New Actions</span>
                    </div>

                    <div className="switcher-item selected">
                        <span>☰</span>
                        <span>Current Jobs</span>
                    </div>
                </div>


            </div>

            {isConnectionPopUpOpen && <ConnectionPopUp closeConnectionPopUp={closeConnectionPopUp} />}

        </div>
    );
}