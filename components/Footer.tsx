import React from 'react';
import Image from 'next/image';
import logoBlack from '../public/injectiveblack.svg';
const Footer = () => {
    return (
        <div className="w-100wv flex justify-center items-center">
            <h1 className="text-[20px]">Powered By</h1>
            <Image className="inline-block" width={150} src={logoBlack} alt={''} />
        </div>
    );
};

export default Footer;
