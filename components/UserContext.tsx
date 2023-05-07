import { createContext } from 'react';
export interface UserContextType {
    metaxchgAddress: `0x${string}`;
    allowedCollections: string[];
    wethAddress: `0x${string}`;
    isGoerliNetwork: boolean;
    setIsGoerliNetwork: (arg: boolean) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
