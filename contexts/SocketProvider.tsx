import React, { createContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Text } from 'react-native'
interface SocketContextProps {
    socket: Socket | null;
}

export const SocketContext = createContext<SocketContextProps | undefined>(undefined);
export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const socketRef = useRef<Socket | null>(null);
    const [isLoading, setIsLoading] = useState(true); // State to track socket initialization
    useEffect(() => {
        socketRef.current = io(`${process.env.EXPO_PUBLIC_SOCKET_PROVIDER}`, {
            transports: ['websocket', 'polling'],
        });
        socketRef.current.on('connect', () => {
            // console.log(Connected with socket ID: ${ socketRef.current?.id });
            setIsLoading(false); // Set loading to false once connected
        });
        socketRef.current.on('connect_error', (err) => {
            // console.error(Connection error: ${ err.message });
            setIsLoading(false); // Set loading to false on error
        });
        return () => {
            socketRef.current?.disconnect();
        };
    }, []);
    if (isLoading) {
        return;
    }
    return (
        <SocketContext.Provider value={{ socket: socketRef.current }}>
            {children}
        </SocketContext.Provider>
    );
};