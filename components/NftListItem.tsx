import img1 from '../public/nftitem1.png';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { useNft } from 'use-nft';
import UserContext, { UserContextType } from './UserContext';
import { abi as metaxchgAbi } from '../contracts/metaxchg.json';

let provider: any;
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum as any);
} else {
    provider = new ethers.providers.JsonRpcProvider(
        'https://goerli.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
    );
}

interface NftListItemProps {
    nftAddress: `0x${string}`;
    token_id: string;
    setIsOwner: (arg: boolean) => void;
}

const NftListItem = ({ nftAddress, token_id, setIsOwner }: NftListItemProps) => {
    const { metaxchgAddress } = useContext(UserContext) as UserContextType;
    const [floorPrice, setFloorPrice] = useState<number | null>(null);
    const { address } = useAccount();
    const { loading, error, nft } = useNft(nftAddress, token_id.toString());

    if (!loading && nft?.owner !== address) {
        setIsOwner(false);
    }

    React.useEffect(() => {
        const getOffers = async () => {
            const contract = new ethers.Contract(metaxchgAddress, metaxchgAbi, provider);
            try {
                const floorPrice = await contract.getFloorPrice(nftAddress);
                setFloorPrice(Number(ethers.utils.formatEther(floorPrice)));
            } catch (error) {
                console.error(error);
            }
        };
        getOffers();
    }, []);

    return (
        <>
            <Image src={nft?.image || img1} onLoad={() => {}} alt="" width={400} height={400} />
            <h1>{nft?.name}</h1>
            <h1>Floor: {floorPrice ? <>{floorPrice}ETH</> : <>???</>}</h1>
        </>
    );
};

export default NftListItem;
