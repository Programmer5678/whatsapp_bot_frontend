import React from 'react';
import { ConnectionHeader } from './connection/ConnectionHeader';
import { ConnectionPopUp } from './connection/ConnectionPopUp';
import { useState } from 'react';
import './Dashboard.css';

export function Dashboard() {

    const [isConnectionPopUpOpen, setIsConnectionPopUpOpen] = useState(true);

    return (

        <div style={{ position: 'relative' , height:"100%"}}>

            <div id="main-content" className={isConnectionPopUpOpen ? 'fade-out' : ''}>
                <ConnectionHeader />
            </div>

            { isConnectionPopUpOpen && <ConnectionPopUp />}

        </div>
    );
}