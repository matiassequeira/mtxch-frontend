import { ethers } from 'ethers';

export const requestSwitchNetwork = async () => {
    let provider: any;
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        provider = new ethers.providers.Web3Provider(window.ethereum as any, 'any');
    } else {
        provider = new ethers.providers.JsonRpcProvider(
            // 'https://mainnet.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
            'https://goerli.infura.io/v3/49e9ff3061214414b9baa13fc93313a6',
        );
    }
    const network = await provider.getNetwork();

    if (window === undefined || window.ethereum === undefined) return;
    if (network.name !== 'goerli') {
        try {
            await provider.send('wallet_switchEthereumChain', [{ chainId: '0x5' }]);
        } catch (error) {
            console.error('Failed to switch chains:', error);
        }
    }
};
