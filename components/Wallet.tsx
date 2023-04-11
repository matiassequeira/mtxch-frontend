import React from 'react';
import { Web3Button } from '@web3modal/react';

const Wallet = () => {
    return (
        <div>
            <h1>Connect you wallet</h1>
            <Web3Button icon="show" label="Connect Wallet" balance="show" />
        </div>
    );
};

export default Wallet;
