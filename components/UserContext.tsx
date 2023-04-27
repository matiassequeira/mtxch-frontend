import { createContext } from 'react';
export interface UserContextType {
    walletConnected: boolean;
    userAddress: string | null;
    setWalletConnected: (arg: boolean) => void;
    setUserAddress: (arg: string) => void;
    metaxchgAddress: string;
}

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
