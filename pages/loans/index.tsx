import React, { useContext, useState } from 'react';
import img1 from '../../public/nftitem1.png';
import LoanActive from '@component/components/LoanActive';
import { abi as metaxchgAbi } from '../../contracts/metaxchg.json';
import { BigNumberish, ethers } from 'ethers';
import { useAccount } from 'wagmi';
import UserContext, { UserContextType } from '@component/components/UserContext';
import { offer } from '../lend';

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
        'https://goerli.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
    );
}

const Loans = () => {
    const { metaxchgAddress } = useContext(UserContext) as UserContextType;
    const { address } = useAccount();
    const [loans, setLoans] = useState<loan[]>([]);
    React.useEffect(() => {
        const getOffers = async () => {
            const contract = new ethers.Contract(metaxchgAddress, metaxchgAbi, provider);

            try {
                const loans = await contract.getLoans();
                setLoans(loans);
            } catch (error) {
                console.error(error);
            }
        };
        getOffers();
    }, [address, metaxchgAddress]);

    return (
        <div className="px-[100px] ">
            <div className=" flex mb-4">
                <div className="space-y-[25px]">
                    <h1 className="font-bold">Active Loans</h1>
                    {loans.length
                        ? loans.map((loan, index) => {
                              console.log(loan);
                              const offer = loan['offer'];
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

                              return (
                                  <LoanActive
                                      key={`lend/${nftAddress}/${tokenId}`}
                                      src={img1}
                                      loanAmount={tokenValuation}
                                      APR={apr}
                                      duration={duration}
                                      health={100}
                                      nftAddress={nftAddress}
                                      tokenId={tokenId}
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
