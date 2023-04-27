import React, { useContext } from 'react';
import NftItem from './NftItem';
import { useAccount } from 'wagmi';
import { useQuery } from 'react-query';
import axios from 'axios';
import UserContext, { UserContextType } from './UserContext';

export interface NftItemInterface {
    id: number;
    token_id: string;
    image_url: string | null;
    asset_contract: {
        address: `0x${string}`;
        description: string; // ui
        name: string; // ui
    };
    collection: {
        slug: string; // for request
    };
    top_ownerships: [
        {
            owner: {
                address: `0x${string}`;
            };
        },
    ];
}

const NftsPage = () => {
    const { address } = useAccount();
    const { allowedCollections } = useContext(UserContext) as UserContextType;
    const { data, isLoading, isError } = useQuery(
        ['nfts', address],
        () => axios.get(`https://testnets-api.opensea.io/api/v1/assets?owner=${address}`),
        { keepPreviousData: true, retry: true, retryDelay: 1000 },
    );
    const assets: NftItemInterface[] = data?.data.assets.filter((asset: NftItemInterface) => {
        if (!allowedCollections.includes(asset.asset_contract.address.toLowerCase())) return;
        return asset;
    });

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
                <div className="w-full flex flex-col items-center justify-center mt-[100px]">
                    <h1>You have no NFTs from allowed collections</h1>
                </div>
            )}
        </>
    );
};

export default NftsPage;
