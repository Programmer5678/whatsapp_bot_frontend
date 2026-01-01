import React from 'react';
import { ConnectionHeader } from './connection/ConnectionHeader';
import { ConnectionPopUp } from './connection/ConnectionPopUp';
import { useState } from 'react';
import './Dashboard.css';
import './ActionButton.css'

export function Dashboard() {

    const [isConnectionPopUpOpen, setIsConnectionPopUpOpen] = useState<boolean>(true);

    function closeConnectionPopUp( )  {
        setIsConnectionPopUpOpen( (isConnectionPopUpOpen) => false );
    }

    function openConnectionPopUp( )  {
        setIsConnectionPopUpOpen( (isConnectionPopUpOpen) => true );
    }

    return (

        <div style={{ position: 'relative' , height:"100%"}}>

            <div id="main-content" className={isConnectionPopUpOpen ? 'fade-out' : ''}>
                <ConnectionHeader openConnectionPopUp={openConnectionPopUp}/>
            </div>

            { isConnectionPopUpOpen && <ConnectionPopUp closeConnectionPopUp={closeConnectionPopUp}/>}

        </div>
    );
}