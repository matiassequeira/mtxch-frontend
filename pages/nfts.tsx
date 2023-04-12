import NftsPage from '@component/components/NftsPage';
import UserContext, { UserContextType } from '@component/components/UserContext';
import WalletNotConnected from '@component/components/WalletNotConnected';
import React, { useContext } from 'react';

const Nfts = () => {
    const { walletConnected } = useContext(UserContext) as UserContextType;
    return <>{walletConnected ? <NftsPage /> : <WalletNotConnected />}</>;
};

export default Nfts;
