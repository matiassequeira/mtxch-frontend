import { useWeb3Modal } from '@web3modal/react';
import { useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import Button from './Button';
import Link from 'next/link';

export default function WalletConnect() {
    const [loading, setLoading] = useState(false);
    const { open } = useWeb3Modal();
    const { isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const label = isConnected ? 'Disconnect' : 'Connect Wallet';
    console.log(open);

    async function onOpen() {
        setLoading(true);
        await open();
        setLoading(false);
    }

    function onClick() {
        if (isConnected) {
            disconnect();
        } else {
            onOpen();
        }
    }

    if (!isConnected)
        return (
            <Button
                onClick={onClick}
                disabled={loading}
                text={loading ? 'Loading...' : label}
                color="black"></Button>
        );
    return (
        <div className="space-x-[10px]">
            <Link
                href={'/'}
                className="rounded-md inline-block text-center w-[135px] py-[12px] text-[14px] border-black border-solid border-[2px]">
                Go To App
            </Link>
            <Button
                onClick={onClick}
                disabled={loading}
                text={loading ? 'Loading...' : label}
                color="black"></Button>
        </div>
    );
}
