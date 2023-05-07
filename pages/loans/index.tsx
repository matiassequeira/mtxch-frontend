import React, { useContext, useState } from 'react';
import img1 from '../../public/nftitem1.png';
import LoanActive from '@component/components/LoanActive';
import { abi as metaxchgAbi } from '../../contracts/metaxchg.json';
import { BigNumberish, ethers } from 'ethers';
import { useAccount } from 'wagmi';
import UserContext, { UserContextType } from '@component/components/UserContext';
import { offer } from '../lend';
import LoanRequest from '@component/components/LoanRequest';
import WalletNotConnected from '@component/components/WalletNotConnected';

export interface loan {
    initialDate: BigNumberish;
    isActive: boolean;
    lender: `0x${string}`;
    offer: offer;
}

let provider: any;
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum as any, 'any');
} else {
    provider = new ethers.providers.JsonRpcProvider(
        // 'https://mainnet.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
        'https://goerli.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
    );
}
const Loans = () => {
    const { metaxchgAddress, isGoerliNetwork } = useContext(UserContext) as UserContextType;
    const { address } = useAccount();
    const [loans, setLoans] = useState<{ loan: loan; index: number }[]>([]);
    const [offers, setOffers] = useState<{ offer: offer; index: number }[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        if (!address || !isGoerliNetwork) return;
        const getOffers = async () => {
            const contract = new ethers.Contract(metaxchgAddress, metaxchgAbi, provider);
            try {
                const loans: loan[] = await contract.getLoans();
                const offers: offer[] = await contract.getOffers();

                const filteredLoans = loans
                    .map((loan: loan, index) => {
                        return { loan, index };
                    })
                    .filter((item) => {
                        if (item.loan.lender.toLowerCase() !== address?.toLowerCase()) return;
                        return item;
                    });

                const filteredOffers = offers
                    .map((offer: offer, index) => {
                        return { offer, index };
                    })
                    .filter((item) => {
                        if (!item.offer['isActive']) return null;
                        if (item.offer['borrower'].toLowerCase() !== address?.toLowerCase()) return;
                        return item;
                    });

                setLoans(filteredLoans);
                setOffers(filteredOffers);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        getOffers();
    }, [address, metaxchgAddress, isGoerliNetwork, provider]);

    if (!address) return <WalletNotConnected text={'Connect your wallet to continue'} />;
    if (!isGoerliNetwork)
        return (
            <div className="px-[120px] text-[#ff0000]">
                <WalletNotConnected text={' Switch the network to Goerli in order to see loans!'} />
            </div>
        );

    if (isLoading) return <div className="px-[120px]">Loading...</div>;

    if (!loans.length && !offers.length)
        return <WalletNotConnected text="You have no active loans and offers" />;

    return (
        <div className="px-[20px] md:px-[100px] ">
            <div className="max-lg:flex-col flex mb-4 ">
                {loans.length ? (
                    <div className="space-y-[25px] max-lg:w-[100%] w-[45%]">
                        <h1 className="font-bold">Active Loans</h1>
                        {loans.map(({ loan, index }) => {
                            const offer = loan['offer'];

                            const duration = Number(offer['duration'].toString()) / 86400;
                            const apr = Number(offer['interestRate'].toString());
                            const loanValue = Number(ethers.utils.formatEther(offer['loanValue']));
                            const tokenValuation = Number(
                                ethers.utils.formatEther(offer['tokenValuation']),
                            );
                            const tokenId = Number(offer['tokenId'].toString());
                            const nftAddress = offer['nftAddress'];
                            const initialFloorPrice = Number(
                                ethers.utils.formatEther(offer['tokenFloorPrice']),
                            ).toFixed(0);

                            return (
                                <LoanActive
                                    key={`loanactive/${nftAddress}/${tokenId}/${index}`}
                                    src={img1}
                                    tokenValuation={tokenValuation}
                                    APR={apr}
                                    duration={duration}
                                    nftAddress={nftAddress}
                                    tokenId={tokenId}
                                    initialFloorPrice={initialFloorPrice}
                                    loanValue={loanValue}
                                />
                            );
                        })}
                    </div>
                ) : null}
                {offers.length ? (
                    <div className="space-y-[25px] max-lg:w-[100%] w-[55%] max-lg:mt-[60px]">
                        <h1 className="font-bold">Loan Requests</h1>
                        {offers.map(({ offer, index }) => {
                            const borrower = offer['borrower'].toLowerCase();
                            const duration = Number(offer['duration'].toString()) / 86400;
                            const apr = Number(offer['interestRate'].toString());
                            const loanValue = Number(ethers.utils.formatEther(offer['loanValue']));
                            const tokenValuation = Number(
                                ethers.utils.formatEther(offer['tokenValuation']),
                            );
                            const tokenId = Number(offer['tokenId'].toString());
                            const nftAddress = offer['nftAddress'];
                            const initialFloorPrice = Number(
                                ethers.utils.formatEther(offer['tokenFloorPrice']),
                            ).toFixed(0);

                            return (
                                <LoanRequest
                                    key={`loanrequest/${nftAddress}/${tokenId}/${index}`}
                                    src={img1}
                                    tokenValuation={tokenValuation}
                                    APR={apr}
                                    duration={duration}
                                    nftAddress={nftAddress}
                                    tokenId={tokenId}
                                    loanValue={loanValue}
                                    index={index}
                                    borrower={borrower}
                                />
                            );
                        })}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Loans;
