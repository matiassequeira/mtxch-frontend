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

const provider = new ethers.providers.JsonRpcProvider(
    // 'https://mainnet.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
    "https://goerli.infura.io/v3/49e9ff3061214414b9baa13fc93313a6"
  );
const Lend = () => {
    const { metaxchgAddress, isGoerliNetwork } = useContext(UserContext) as UserContextType;
    const { address } = useAccount();
    const [offers, setOffers] = useState<offer[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    console.log(isGoerliNetwork);
    React.useEffect(() => {
        if (!address || !isGoerliNetwork) return;
        console.log('here');
        setIsLoading(true);
        const getOffers = async () => {
            const contract = new ethers.Contract(metaxchgAddress, metaxchgAbi, provider);
            const offers = await contract.getOffers();
            setOffers(offers);
            setIsLoading(false);
        };
        getOffers();
    }, [address, metaxchgAddress, isGoerliNetwork]);

    if (!address) return <WalletNotConnected text={'Connect your wallet to continue'} />;

    if (!isGoerliNetwork)
        return (
            <div className="text-[#ff0000]">
                <WalletNotConnected text={'Switch the network to Goerli in order to see Offers!'} />
            </div>
        );

    if (isLoading) return <WalletNotConnected text={'Loading...'} />;

    return (
        <div className="px-[20px] md:px-[120px] py-[20px]">
            <div className=" flex mb-4">
                <div className="w-[60%]">
                    <h1 className="font-bold mb-[30px]">Loan Requests</h1>
                </div>
            </div>
            <div className="space-y-[25px]">
                {offers.length
                    ? offers.map((offer, index) => {
                          const isActive = offer['isActive'];
                          if (!isActive) return null;
                          const borrower = offer['borrower'];
                          if (borrower.toLowerCase() === address.toLowerCase()) return null;
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
                                  tokenValuation={tokenValuation}
                                  APR={apr}
                                  duration={duration}
                                  nftAddress={nftAddress}
                                  tokenId={tokenId}
                                  index={index}
                                  loanValue={loanValue}
                                  borrower={borrower}
                              />
                          );
                      })
                    : null}
            </div>
        </div>
    );
};

export default Lend;
