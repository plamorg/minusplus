import React from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';


// create toast context
export const ToastContext = React.createContext(() => {});

// create provider
export function ToastProvider({ children }) {
    const toast = useToast();
    return (
        <ToastContext.Provider value={toast}>{children}</ToastContext.Provider>
    );
}

export function withNavigation(Component) {
    return props => <Component {...props} navigate={useNavigate()} />;
}