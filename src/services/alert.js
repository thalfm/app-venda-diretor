import React from 'react';
import { AlertContext } from '../globalState';

const alert = () => { 
    const { dispatchAlert } = React.useContext(AlertContext);
    
    const info = (message) => {
            dispatchAlert({
                type: 'open',
                alertType: 'info',
                message: message
            });
        };

    const error = (message) => {
        dispatchAlert({
            type: 'open',
            alertType: 'error',
            message: message
        });
    };

    const success = (message) => {
        dispatchAlert({
            type: 'open',
            alertType: 'success',
            message: message
        });
    };
}

export default alert;

