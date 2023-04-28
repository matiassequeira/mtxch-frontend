import { createContext } from 'react';
export interface UserContextType {
    walletConnected: boolean;
    userAddress: string | null;
    setWalletConnected: (arg: boolean) => void;
    setUserAddress: (arg: string) => void;
    metaxchgAddress: `0x${string}`;
    allowedCollections: string[];
    wethAddress: `0x${string}`;
}

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
