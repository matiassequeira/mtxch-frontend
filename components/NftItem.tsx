import Image from 'next/image';
import React from 'react';

const NftItem = ({ imageSrc }: any) => {
    return (
        <Image src={imageSrc} alt={''} width={250} height={250} className="hover:cursor-pointer" />
    );
};

export default NftItem;
