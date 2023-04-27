import React, { FC, useEffect, useRef } from 'react';
import Image from 'next/image';
import { LendItemProps } from './LendItem';
import CounterForm from './CounterForm';

// interface CounterProps {
//     src: any;
//     loanAmount: number;
//     APR: number;
//     duration: number;
//     closeMenu: () => void;
// }

const Counter = () => {
    return <></>;
};
// const Counter: FC<CounterProps> = ({ src, loanAmount, duration, APR, closeMenu }) => {
//     const counterRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const handler = (event: MouseEvent) => {
//             if (counterRef.current && !counterRef.current.contains(event.target as Node)) {
//                 closeMenu();
//             }
//         };

//         document.addEventListener('mousedown', handler);

//         return () => document.removeEventListener('mousedown', handler);
//     }, [closeMenu]);

//     return (
//         <div
//             ref={counterRef}
//             className="pt-[50px] pl-[50px] absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] z-50 bg-white shadow-2xl w-[800px] h-[500px] rounded-xl flex">
//             <div className="w-[50%] space-y-[20px]">
//                 <h2 className="font-bold">Request</h2>
//                 <Image src={src} alt={''} width={150} height={150} />
//                 <div className="flex flex-col justify-between space-y-[10px]">
//                     <h2>Loan Amount: {loanAmount} WETH</h2>
//                     <h2>Duration: {duration} days</h2>
//                     <h2>APR: {APR.toFixed(1)}%</h2>
//                 </div>
//             </div>

//             <CounterForm closeMenu={closeMenu} />

//             <svg
//                 className="hover:cursor-pointer absolute right-4 top-4 w-8 h-8 hover:w-10 hover:h-10 hover:right-3 hover:top-3"
//                 onClick={closeMenu}
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg">
//                 <path
//                     fillRule="evenodd"
//                     clipRule="evenodd"
//                     d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
//                     fill="#000000"
//                 />
//             </svg>
//         </div>
//     );
// };

export default Counter;
