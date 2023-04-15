import React, { useState, useEffect } from 'react';
import Header from './Header';
import NftItem from './NftItem';
import { useAccount } from 'wagmi';
import { useQuery } from 'react-query';
import axios from 'axios';

export interface NftItemInterface {
    id: number;
    token_id: string;
    image_url: string | null;
    asset_contract: {
        address: string;
        description: string; // ui
        name: string; // ui
    };
    collection: {
        slug: string; // for request
    };
    top_ownerships: [
        {
            owner: {
                address: string;
            };
        },
    ];
}

const NftsPage = () => {
    const { address } = useAccount();
    // const [userNfts, setUserNfts] = useState<NftItemInterface[]>([]);
    const { data, isLoading, isError } = useQuery(
        'nfts',
        () => axios.get(`https://testnets-api.opensea.io/api/v1/assets?owner=${address}`),
        { keepPreviousData: true, retry: true, retryDelay: 1000 },
    );
    const assets: NftItemInterface[] = data?.data.assets;

    if (!address) return null;

    return (
        <>
            {isLoading ? (
                <div className="mx-[120px]">Your NFTs are being loaded...</div>
            ) : assets.length ? (
                <div>
                    <div className="px-[120px] mb-3 space-y-6">
                        <h1>Choose NFT for Loan Request</h1>
                        <div className="grid grid-cols-4 gap-4 w-full ">
                            {assets.map((item) => {
                                if (item.image_url?.startsWith('ipfs://')) {
                                    item.image_url = `https://ipfs.io/ipfs/${
                                        item.image_url.split('ipfs://')[1]
                                    }`;
                                }
                                return <NftItem key={item.id} {...item} />;
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="px-[120px]">You have no NFTs</div>
            )}
        </>
    );
};

export default NftsPage;
