import Image from 'next/image';
import React from 'react';

const NftItem = ({ imageSrc }: any) => {
    return (
        <div className="overflow-hidden w-[300px] h-[300px]">
            <Image
                src={imageSrc}
                alt={''}
                width={300}
                height={300}
                className="hover:cursor-pointer"
            />
        </div>
    );
};

export default NftItem;
