import React from 'react';

const WalletNotConnected = ({ text }: { text: string }) => {
    return (
        <>
            <div className="w-full flex flex-col items-center justify-center mt-[100px]">
                <h1>{text}</h1>
            </div>
        </>
    );
};

export default WalletNotConnected;
