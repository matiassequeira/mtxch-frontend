import img1 from '../public/nftitem1.png';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { useNft } from 'use-nft';
import UserContext, { UserContextType } from './UserContext';
import { abi as metaxchgAbi } from '../contracts/metaxchg.json';

const provider = new ethers.providers.JsonRpcProvider(
    // 'https://mainnet.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
    "https://goerli.infura.io/v3/49e9ff3061214414b9baa13fc93313a6"
  );
  
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

    const name =
        nftAddress.toLowerCase() === '0xfa97df129fe2ffdfd63bc3f245dd769f52742bad'
            ? 'Bored Ape Yacht Club'
            : 'CRYPTOPUNKS';

    useEffect(() => {
        if (!loading && nft?.owner !== address) {
            setIsOwner(false);
        }
    }, [loading, address]);

    React.useEffect(() => {
        const getFloorPrice = async () => {
            const contract = new ethers.Contract(metaxchgAddress, metaxchgAbi, provider);
            try {
                const floorPrice = await contract.getFloorPrice(nftAddress);
                setFloorPrice(Number(ethers.utils.formatEther(floorPrice)));
            } catch (error) {
                console.error(error);
            }
        };
        getFloorPrice();
    }, [metaxchgAddress, nftAddress, provider]);

    return (
        <>
            <div className="max-lg:max-w-[250px] max-w-[400px] max-h-[400px]">
                <Image
                    src={nft?.image || img1}
                    onLoad={() => {}}
                    alt=""
                    width={400}
                    height={400}
                    sizes="(min-width: 1024px) 200px,
                (max-width: 1024) 100px"
                />
            </div>
            <h1>{nft?.name || name + ` #${token_id}`}</h1>
            <h1>Floor: {floorPrice ? <>{floorPrice}ETH</> : <>???</>}</h1>
        </>
    );
};

export default NftListItem;
