import { useContext, useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import Button from './Button';
import Link from 'next/link';
import UserContext, { UserContextType } from './UserContext';
import { useRouter } from 'next/router';

import { useConnect } from 'wagmi';
import { ethers } from 'ethers';
import { requestSwitchNetwork } from '@component/utils/requestSwitchNetwork';
import NotifiBell from './NotifiBell';

export default function WalletConnect() {
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
    const { isConnected, address } = useAccount();
    const { disconnect } = useDisconnect();

    const label = address
        ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
        : 'Connect Wallet';
    const account = useAccount();
    const { setWalletConnected, setUserAddress } = useContext(UserContext) as UserContextType;

    const route = useRouter();
    const { pathname } = route;
    async function onOpen() {
        for (let connector of connectors) {
            connect({ connector });
        }
    }

    function onClick() {
        if (isConnected) {
            disconnect();
        } else {
            onOpen();
        }
    }
    useEffect(() => {
        isConnected ? setWalletConnected(true) : setWalletConnected(false);
        if (isConnected && account.address) {
            setWalletConnected(true);
            setUserAddress(account.address);
        } else {
            setWalletConnected(false);
            setUserAddress('');
        }
    }, [isConnected, account, setUserAddress, setWalletConnected]);

    useEffect(() => {
        if (!isConnected) return;
        requestSwitchNetwork();
    }, [isConnected, pathname]);

    if (!isConnected)
        return (
            <Button
                onClick={onClick}
                disabled={isLoading}
                text={isLoading ? 'Connecting...' : label}
                color="black"></Button>
        );
    return (
        <>
            <div className="space-x-[10px]">
                {pathname === '/' ? (
                    <div className="space-x-[20px] flex items-center">
                        <NotifiBell />
                        <Link
                            href={'/nfts'}
                            className="rounded-md inline-block text-center w-[135px] py-[12px] text-[14px] border-black border-solid border-[2px]">
                            Go To App
                        </Link>
                        <div className="hidden sm:inline-block">
                            <Button
                                onClick={onClick}
                                disabled={isLoading}
                                text={isLoading ? 'Connecting...' : label}
                                color="black"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="space-x-[20px] flex items-center">
                        <NotifiBell />
                        <div className="">
                            <Button
                                onClick={onClick}
                                disabled={isLoading}
                                text={isLoading ? 'Connecting...' : label}
                                color="black"
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
