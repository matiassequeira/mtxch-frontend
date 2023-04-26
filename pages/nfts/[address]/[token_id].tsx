import Button from '@component/components/Button';
import ListForm from '@component/components/ListForm';
import { NftItemInterface } from '@component/components/NftsPage';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';
import ERC721 from '../../../contracts/ERC721.json';
import metaxchg from '../../../contracts/metaxchg.json';
import { ethers } from 'ethers';

const erc721Abi = ERC721.abi;
const metaxchgAbi = metaxchg.abi;

export interface Collection {}

let provider: any;
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum as any);
} else {
    provider = new ethers.providers.JsonRpcProvider(
        'https://goerli.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
    );
}

export const getServerSideProps = async (context: any) => {
    const { address, token_id } = context.params;
    const response = await fetch(
        `https://testnets-api.opensea.io/api/v1/asset/${address}/${token_id}`,
    );
    const data = await response.json();

    return { props: { nftData: data } };
};

const LoanNft = (props: { nftData: NftItemInterface }) => {
    const { nftData } = props;
    const { image_url, token_id, asset_contract } = nftData;
    if (!asset_contract) return null;
    const { name, address } = asset_contract;

    const nftOwnerAddress = nftData.top_ownerships[0].owner.address;
    const slug = nftData.collection.slug;

    const { address: userAddress } = useAccount();
    const { data }: any = useQuery(
        `collection/${slug}`,
        () => axios.get(`https://testnets-api.opensea.io/api/v1/collection/${slug}`),
        { keepPreviousData: true, retry: true, retryDelay: 1000 },
    );

    const floorPrice = data?.data?.collection?.stats.floor_price;

    const listNft = (data: {
        LoanAmount: number;
        TokenValuation: number;
        Duration: string;
        APR: number;
        InjAddress: string;
    }) => {
        const { TokenValuation, LoanAmount, Duration, APR } = data;
        function prependNullBytes(address: string) {
            // Remove the '0x' prefix if it exists
            const cleanedAddress = address.startsWith('0x') ? address.slice(2) : address;

            // Check if the cleaned address is a valid EVM address
            if (cleanedAddress.length !== 40) {
                throw new Error('Invalid EVM address');
            }

            // Prepend 12 null bytes (24 zeros) to the cleaned address
            const paddedAddress = '0x' + '0'.repeat(24) + cleanedAddress;

            return paddedAddress;
        }
        const destinationAddress = prependNullBytes('0xe8C666d6a9965FdFF1A6Db2af8B1a9BF43670629');

        const weiTokenValuation = ethers.utils.parseUnits(TokenValuation.toString(), 18);

        const weiLoanValue = ethers.utils.parseUnits(LoanAmount.toString(), 18);

        const makeOffer = async () => {
            const signer = provider.getSigner();
            const contract = new ethers.Contract(address, metaxchgAbi, signer);

            const gasPrice = await provider.getGasPrice(); // Get the current gas price
            const gasLimit = 300000;

            const offer = await contract.makeOffer(
                address,
                token_id,
                weiTokenValuation.toString(),
                weiLoanValue.toString(),
                destinationAddress,
                Number(Duration),
                APR,
                { gasLimit, gasPrice }, // Pass the gas limit and gas price as options to the contract method
            );
        };

        makeOffer();
    };

    if (userAddress?.toLowerCase() !== nftOwnerAddress.toLowerCase())
        return <div className="text-center">This is not your NFT</div>;
    return (
        <div className="px-[120px] flex mb-3">
            <div className=" w-[55%]">
                <Image
                    src={image_url || 'https://via.placeholder.com/300'}
                    alt=""
                    width={400}
                    height={400}
                />
                <h1>
                    {name} #{token_id}
                </h1>
                <h1>Floor: {floorPrice}ETH</h1>
                {/* <h1>Max Loan: {maxFloat.toFixed(3)}ETH</h1> */}
            </div>

            <ListForm listNft={listNft} />
        </div>
    );
};

export default LoanNft;
