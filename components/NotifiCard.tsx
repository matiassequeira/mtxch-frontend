import { NotifiContext, NotifiSubscriptionCard } from '@notifi-network/notifi-react-card';
import { arrayify } from 'ethers/lib/utils.js';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';

import { connector } from './Provider';

export const WalletConnectCard = () => {
    const { address, isConnected } = useAccount();

    const { connect } = useConnect({
        connector: connector,
    });
    const { disconnect } = useDisconnect();

    const { signMessageAsync } = useSignMessage();
    return (
        <div>
            <NotifiContext
                dappAddress="metaxchg"
                env="Development" // or "Production"
                signMessage={async (message) => {
                    const result = await signMessageAsync({ message });
                    return arrayify(result);
                }}
                walletPublicKey={address ?? ''}
                walletBlockchain="ETHEREUM">
                <div style={{ width: '350px' }}>
                    <NotifiSubscriptionCard cardId="a75c790aed3a4d909d326d9eb5aa30d3" darkMode />
                </div>
            </NotifiContext>
        </div>
    );
};

export default WalletConnectCard;
