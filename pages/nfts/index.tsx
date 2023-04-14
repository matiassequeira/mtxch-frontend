import NftsPage from '@component/components/NftsPage';
import WalletNotConnected from '@component/components/WalletNotConnected';
import { useAccount } from 'wagmi';

const Nfts = () => {
    const { address } = useAccount();
    return <>{address ? <NftsPage /> : <WalletNotConnected />}</>;
};

export default Nfts;
