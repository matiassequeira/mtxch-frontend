import Image from 'next/image';
import { Inter } from 'next/font/google';
import Wallet from '@component/components/Wallet';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <main className="w-full h-full">
            <Wallet />
        </main>
    );
}
