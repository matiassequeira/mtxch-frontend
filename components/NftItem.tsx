import React from 'react';
import img1 from '../public/nftitem1.png';
import Image from 'next/image';
import { NftItemInterface } from './NftsPage';
import Link from 'next/link';

const NftItem = (item: NftItemInterface) => {
    return (
        <div>
            <div className="overflow-hidden max-w-[250px] max-h-[250px]">
                <Link href={`/nfts/${item.asset_contract.address}/${item.token_id}`}>
                    <Image
                        src={item.image_url || img1}
                        alt={''}
                        width={250}
                        height={250}
                        quality={100}
                        className="hover:cursor-pointer object-cover"
                    />
                </Link>
            </div>
            <h1 className="text-xl">
                {item.asset_contract.name} #{item.token_id}
            </h1>
        </div>
    );
};

export default NftItem;
