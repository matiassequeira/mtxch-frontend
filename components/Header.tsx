import Link from 'next/link';
import React from 'react';
import Wallet from './WalletConnect';

const Header = () => {
    return (
        <div className="flex justify-between items-center px-[120px] h-[90px]">
            <Link href={'/'} className=" font-bold">
                MetaXChg
            </Link>
            <Wallet />
        </div>
    );
};

export default Header;