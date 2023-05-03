import { NotifiClient } from '@notifi-network/notifi-node';
// Log in to obtain a token
import { createGraphQLClient, createNotifiService } from '@notifi-network/notifi-node';
import { randomBytes } from 'crypto';

const graphqlClient = createGraphQLClient('Development');
const notifiService = createNotifiService(graphqlClient);

const client = new NotifiClient(notifiService);

export const notifiDirectPush = async (message: string, address: string) => {
    const result = await client.logIn({
        sid: 'C7RIAAS5Y7XK1E3Y78FW4Q1K1C1757BQ',
        secret: 'OnVfge9p5h<4Whh5Iw5lI6J+q5x9FLq~LRe9p87z~MtdtYjoyls0%IU)7Fa&nN3X',
    });
    const msg = await client.sendDirectPush(result.token, {
        key: randomBytes(20).toString('hex'),
        type: 'metaxchg__loans',
        walletPublicKey: address.toLowerCase(),
        walletBlockchain: 'ETHEREUM' as any,
        message,
    });
};
