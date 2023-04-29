import React, { useContext, useState } from 'react';
import img1 from '../../public/nftitem1.png';
import LoanActive from '@component/components/LoanActive';
import { abi as metaxchgAbi } from '../../contracts/metaxchg.json';
import { BigNumberish, ethers } from 'ethers';
import { useAccount } from 'wagmi';
import UserContext, { UserContextType } from '@component/components/UserContext';
import { offer } from '../lend';
import LoanRequest from '@component/components/LoanRequest';

export interface loan {
    initialDate: BigNumberish;
    isActive: boolean;
    lender: `0x${string}`;
    offer: offer;
}

let provider: any;
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum as any);
} else {
    provider = new ethers.providers.JsonRpcProvider(
        // 'https://mainnet.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
        'https://goerli.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
    );
}

const Loans = () => {
    const { metaxchgAddress } = useContext(UserContext) as UserContextType;
    const { address } = useAccount();
    const [loans, setLoans] = useState<loan[]>([]);
    const [offers, setOffers] = useState<offer[]>([]);
    const [isGoerliNetwork, setIsGoerliNetwork] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const getOffers = async () => {
            const contract = new ethers.Contract(metaxchgAddress, metaxchgAbi, provider);
            try {
                const loans = await contract.getLoans();
                const offers = await contract.getOffers();
                setLoans(loans);
                setOffers(offers);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        getOffers();
    }, [address, metaxchgAddress]);

    React.useEffect(() => {
        const getNetwork = async () => {
            const network = await provider.getNetwork();
            if (network.name !== 'goerli') setIsGoerliNetwork(false);
            else setIsGoerliNetwork(true);
        };
        getNetwork();
    }, []);

    if (!isGoerliNetwork)
        return (
            <div className="px-[120px] text-[#ff0000]">
                Switch the network to Goerli in order to see Offers!
            </div>
        );

    if (isLoading) return <div className="px-[120px]">Loading...</div>;

    if (!loans.length && !offers.length) return <>You have no active loans and offers</>;

    return (
        <div className="px-[100px] ">
            <div className=" flex mb-4 ">
                <div className="space-y-[25px] w-[45%]">
                    <h1 className="font-bold">Active Loans</h1>
                    {loans.length
                        ? loans.map((loan, index) => {
                              const offer = loan['offer'];
                              if (offer['borrower'].toLowerCase() !== address?.toLowerCase())
                                  return null;

                              const duration = Number(offer['duration'].toString()) / 86400;
                              const apr = Number(offer['interestRate'].toString());
                              const loanValue = Number(
                                  ethers.utils.formatEther(offer['loanValue']),
                              );
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
                                      key={`lend/${nftAddress}/${tokenId}`}
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
                          })
                        : null}
                </div>
                <div className="space-y-[25px] w-[50%]">
                    <h1 className="font-bold">Loan Requests</h1>
                    {loans.length
                        ? offers.map((offer, index) => {
                              if (offer['borrower'].toLowerCase() !== address?.toLowerCase())
                                  return null;
                              if (!offer['isActive']) return null;
                              const duration = Number(offer['duration'].toString()) / 86400;
                              const apr = Number(offer['interestRate'].toString());
                              const loanValue = Number(
                                  ethers.utils.formatEther(offer['loanValue']),
                              );
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
                                      key={index}
                                      src={img1}
                                      tokenValuation={tokenValuation}
                                      APR={apr}
                                      duration={duration}
                                      nftAddress={nftAddress}
                                      tokenId={tokenId}
                                      loanValue={loanValue}
                                      index={index}
                                  />
                              );
                          })
                        : null}
                </div>
            </div>
        </div>
    );
};

export default Loans;
