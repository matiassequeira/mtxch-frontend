import Image from 'next/image';
import { Inter } from 'next/font/google';
import Header from '@component/components/Header';
import punk1 from '../public/punk1.png';
import punk2 from '../public/punk2.png';
import punk3 from '../public/punk3.png';
import punk4 from '../public/punk4.png';
import Button from '@component/components/Button';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <main className="w-full h-[100vh]">
            <div className="w-full h-[calc(100vh-90px)] text-center flex items-center justify-center space-x-[80px]">
                <div className="flex flex-col items-start text-start space-y-[20px]">
                    <h1 className="text-[50px] font-medium">
                        Borrow & Lend On
                        <p>Any Chain</p>
                    </h1>
                    <h2 className="text-[30px]">
                        Use your NFTs as collateral, Get <p>a Loan on Any Chain</p>
                    </h2>
                    <div className="flex space-x-[10px] justify-center">
                        <Button color="black" text="Get a Loan" />
                        <Button color="white" text="Become a Lender" />
                    </div>
                </div>

                <div className="images grid grid-cols-2 grid-rows-2 gap-2 w-[520px]">
                    <Image src={punk1} alt={''} width={200} height={200} />
                    <Image src={punk2} alt={''} width={200} height={200} />
                    <Image src={punk3} alt={''} width={200} height={200} />
                    <Image src={punk4} alt={''} width={200} height={200} />
                </div>
            </div>
        </main>
    );
}
