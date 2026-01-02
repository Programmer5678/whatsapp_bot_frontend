import React from 'react';
import { ConnectionHeader } from '../connection/header/ConnectionHeader';
import { ConnectionPopUp } from '../connection/popup/ConnectionPopUp';
import { useState } from 'react';
import './Dashboard.css';

export function Dashboard() {

    const [isConnectionPopUpOpen, setIsConnectionPopUpOpen] = useState<boolean>(false);

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