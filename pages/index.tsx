import Image from 'next/image';
import { Inter } from 'next/font/google';
import Header from '@component/components/Header';
import punk1 from '../public/punk1.png';
import punk2 from '../public/punk2.png';
import punk3 from '../public/punk3.png';
import punk4 from '../public/punk4.png';
import Button from '@component/components/Button';
import Link from 'next/link';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <main className="w-full h-[100vh] px-8">
            <div className="w-full h-[calc(100vh-90px)] text-center flex flex-col-reverse md:flex-row items-center justify-end mt-[50px] md:mt-0 md:justify-center md:space-x-[80px]">
                <div className="flex flex-col items-center md:items-start md:text-start space-y-[20px] md:py-0 py-[30px]">
                    <h1 className="text-[30px] lg:text-[50px] font-medium">
                        Borrow & Lend On Any Chain
                    </h1>
                    <h2 className="text-[20px] lg:text-[30px]">
                        Use your NFTs as collateral, Get <p>a Loan on Any Chain</p>
                    </h2>
                    <div className="flex space-x-[10px] justify-center">
                        <Link href={'/loans'}>
                            <Button color="black" text="Get a Loan" />
                        </Link>
                        <Link href={'/lend'}>
                            <Button color="white" text="Become a Lender" />
                        </Link>
                    </div>
                </div>

                <div className="images hidden md:grid grid-cols-2 grid-rows-2 gap-2 w-[520px]">
                    <Image
                        src={punk1}
                        alt={''}
                        sizes="(min-width: 1024px) 200px,
              (max-width: 1024) 100px"
                    />
                    <Image
                        src={punk2}
                        alt={''}
                        sizes="(min-width: 1024px) 200px,
              (max-width: 1024) 100px"
                    />
                    <Image
                        src={punk3}
                        alt={''}
                        sizes="(min-width: 1024px) 200px,
              (max-width: 1024) 100px"
                    />
                    <Image
                        src={punk4}
                        alt={''}
                        sizes="(min-width: 1024px) 200px,
              (max-width: 1024) 100px"
                    />
                </div>
                <div className="flex space-x-[15px] md:hidden ">
                    <Image src={punk1} alt={''} width={250} height={250} />
                    <Image
                        className="sm:inline-block hidden"
                        src={punk2}
                        alt={''}
                        width={250}
                        height={250}
                    />
                </div>
            </div>
        </main>
    );
}
