import LendItem from '@component/components/LendItem';
import React, { useContext, useState } from 'react';
import img1 from '../../public/nftitem1.png';
import { abi as metaxchgAbi } from '../../contracts/metaxchg.json';
import { BigNumberish, ethers } from 'ethers';
import { useAccount } from 'wagmi';
import UserContext, { UserContextType } from '@component/components/UserContext';
import WalletNotConnected from '@component/components/WalletNotConnected';

export interface offer {
    borrower: `0x${string}`;
    destinationAddress: string;
    duration: number;
    interestRate: number;
    isActive: boolean;
    loanValue: BigNumberish;
    nftAddress: string;
    tokenFloorPrice: BigNumberish;
    tokenId: BigNumberish;
    tokenValuation: BigNumberish;
}

let provider: any;
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum as any);
} else {
    provider = new ethers.providers.JsonRpcProvider(
        'https://goerli.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
    );
}

const Lend = () => {
    const { metaxchgAddress } = useContext(UserContext) as UserContextType;
    const { address } = useAccount();
    const [offers, setOffers] = useState<offer[]>([]);

    React.useEffect(() => {
        if (!address) return;

        const getOffers = async () => {
            const contract = new ethers.Contract(metaxchgAddress, metaxchgAbi, provider);
            try {
                const offers = await contract.getOffers();
                setOffers(offers);
            } catch (error) {
                console.error(error);
            }
        };
        getOffers();
    }, [address]);

    if (!address) return <WalletNotConnected />;

    return (
        <div className="px-[120px] ">
            <div className=" flex mb-4">
                <div className="w-[60%]">
                    <h1 className="text-center font-bold">Requests</h1>
                </div>
                <div>
                    <h1 className="font-bold">Open Offers</h1>
                </div>
            </div>
            <div className="space-y-[25px]">
                {offers.length
                    ? offers.map((offer, index) => {
                          const isActive = offer['isActive'];
                          if (!isActive) return null;
                          const duration = offer['duration'] / 86400;
                          const apr = offer['interestRate'];

                          const loanValue = Number(ethers.utils.formatEther(offer['loanValue']));
                          const tokenValuation = Number(
                              ethers.utils.formatEther(offer['tokenValuation']),
                          );

                          const tokenId = Number(offer['tokenId'].toString());

                          const nftAddress = offer['nftAddress'];

                          return (
                              <LendItem
                                  key={`lend/${nftAddress}/${tokenId}`}
                                  src={img1}
                                  loanAmount={tokenValuation}
                                  APR={apr}
                                  duration={duration}
                                  nftAddress={nftAddress}
                                  tokenId={tokenId}
                                  index={index}
                              />
                          );
                      })
                    : null}
            </div>
        </div>
    );
};

export default Lend;
