import ListForm from '@component/components/ListForm';
import React, { useContext, useState } from 'react';
import { useAccount } from 'wagmi';
import { abi as metaxchgAbi } from '../../../contracts/metaxchg.json';
import { abi as erc721Abi } from '../../../contracts/ERC721.json';
import { ethers } from 'ethers';
import { prependNullBytes } from '@component/utils/prependNullBytes';
import UserContext, { UserContextType } from '@component/components/UserContext';
import NftListItem from '@component/components/NftListItem';
import { checkTxStatus } from '@component/utils/checkTxStatus';
import { useRouter } from 'next/router';

let provider: any;
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum as any);
} else {
    provider = new ethers.providers.JsonRpcProvider(
        // 'https://mainnet.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
        'https://goerli.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
    );
}

export const getServerSideProps = async (context: any) => {
    const { address, token_id } = context.params;
    return { props: { nftAddress: address, token_id: token_id } };
};

const LoanNft = (props: { nftAddress: `0x${string}`; token_id: string }) => {
    const { nftAddress, token_id } = props;
    const { allowedCollections, metaxchgAddress } = useContext(UserContext) as UserContextType;
    const { address } = useAccount();
    const [isOwner, setIsOwner] = useState(true);

    const router = useRouter();

    const listNft = (data: {
        LoanAmount: number;
        TokenValuation: number;
        Duration: string;
        APR: number;
        InjAddress: string;
    }) => {
        if (!address) return;
        const { TokenValuation, LoanAmount, APR } = data;
        const Duration = Number(data.Duration) * 86400;
        const destinationAddress = prependNullBytes(address);
        const weiTokenValuation = ethers.utils.parseUnits(TokenValuation.toString(), 18);
        const weiLoanValue = ethers.utils.parseUnits(LoanAmount.toString(), 18);

        const makeOffer = async () => {
            const signer = provider.getSigner();
            const tokenContract = new ethers.Contract(nftAddress, erc721Abi, provider);
            const contract = new ethers.Contract(metaxchgAddress, metaxchgAbi, provider);

            const owner = await tokenContract.ownerOf(token_id);
            const signerAddress = await signer.getAddress();

            if (owner !== signerAddress) {
                throw new Error('You must be the owner of the token to perform this operation');
            }

            const isApproved = await tokenContract.isApprovedForAll(owner, metaxchgAddress);
            if (!isApproved) {
                const approvedAddress = await tokenContract.getApproved(token_id);
                if (approvedAddress.toLowerCase() !== metaxchgAddress.toLowerCase()) {
                    await tokenContract.connect(signer).approve(contract.address, token_id);
                }
            }

            const gasLimit = 300000;
            const transaction = {
                to: metaxchgAddress,
                data: contract.interface.encodeFunctionData('makeOffer', [
                    nftAddress,
                    token_id,
                    weiTokenValuation.toString(),
                    weiLoanValue.toString(),
                    destinationAddress,
                    Number(Duration),
                    APR,
                ]),
                gasLimit: gasLimit,
            };
            const transactionResponse = await signer.sendTransaction(transaction);

            const success = await checkTxStatus(provider, transactionResponse.hash);
            // IF SUCCESS REDIRECT TO BORROWER

            if (success) router.push('/loans');
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
