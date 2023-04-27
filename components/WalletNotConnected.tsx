import React from 'react';
import Header from './Header';
import Image from 'next/image';
import punk1 from '../public/punk1.png';

const WalletNotConnected = () => {
    return (
        <>
            <div className="w-full flex flex-col items-center justify-center mt-[100px]">
                <h1>Connect your wallet to continue</h1>
            </div>
        </>
    );
};

export default WalletNotConnected;
