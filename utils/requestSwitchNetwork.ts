import { ethers } from 'ethers';

export const requestSwitchNetwork = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const network = await provider.getNetwork();

    if (window === undefined || window.ethereum === undefined) return;
    if (network.name !== 'goerli') {
        try {
            await provider.send('wallet_switchEthereumChain', [{ chainId: '0x5' }]);
            console.log('User is now on the Goerli network');
        } catch (error) {
            console.error('Failed to switch chains:', error);
        }
    }
};
