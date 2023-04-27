import ListForm from '@component/components/ListForm';
import React, { useContext, useState } from 'react';
import { useAccount } from 'wagmi';
import { abi as metaxchgAbi } from '../../../contracts/metaxchg.json';
import { ethers } from 'ethers';
import { prependNullBytes } from '@component/utils/prependNullBytes';
import UserContext, { UserContextType } from '@component/components/UserContext';
import NftListItem from '@component/components/NftListItem';

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
    return { props: { nftAddress: address, token_id: token_id } };
};

const LoanNft = (props: { nftAddress: `0x${string}`; token_id: string }) => {
    const { nftAddress, token_id } = props;
    const { allowedCollections } = useContext(UserContext) as UserContextType;
    const { address } = useAccount();
    const [isOwner, setIsOwner] = useState(true);

    const listNft = (data: {
        LoanAmount: number;
        TokenValuation: number;
        Duration: string;
        APR: number;
        InjAddress: string;
    }) => {
        if (!address) return;
        const { TokenValuation, LoanAmount, Duration, APR } = data;

        const destinationAddress = prependNullBytes(address);

        const weiTokenValuation = ethers.utils.parseUnits(TokenValuation.toString(), 18);
        const weiLoanValue = ethers.utils.parseUnits(LoanAmount.toString(), 18);

        const makeOffer = async () => {
            const signer = provider.getSigner();
            const contract = new ethers.Contract(nftAddress, metaxchgAbi, signer);

            const gasPrice = await provider.getGasPrice(); // Get the current gas price
            const gasLimit = 300000;

            const offer = await contract.makeOffer(
                nftAddress,
                token_id,
                weiTokenValuation.toString(),
                weiLoanValue.toString(),
                destinationAddress,
                Number(Duration),
                APR,
                { gasLimit, gasPrice }, // Pass the gas limit and gas price as options to the contract method
            );

            const check = await offer.estimateGas();
        };

        makeOffer();
    };

    if (!allowedCollections.includes(nftAddress.toLowerCase()))
        return (
            <div className="w-full flex flex-col items-center justify-center mt-[100px]">
                <h1>This NFT is not supported</h1>
            </div>
        );

    if (!isOwner)
        return (
            <div className="w-full flex flex-col items-center justify-center mt-[100px]">
                <h1>You are not an owner or NFT does not exist</h1>
            </div>
        );

    return (
        <div className="px-[120px] flex mb-3">
            <div className=" w-[55%]">
                <NftListItem nftAddress={nftAddress} token_id={token_id} setIsOwner={setIsOwner} />
            </div>

            <ListForm listNft={listNft} />
        </div>
    );
};

export default LoanNft;
