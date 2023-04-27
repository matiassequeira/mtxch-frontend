import React from 'react';
import { useForm } from 'react-hook-form';

const CounterForm = () => {
    return <></>;
};

// interface FormValues {
//     LoanAmount: number;
//     TokenValuation: number;
//     Duration: string;
//     APR: number;
//     InjAddress: string;
// }

// const CounterForm = ({ closeMenu }: { closeMenu: () => void }) => {
//     const {
//         register,
//         formState: { errors },
//         handleSubmit,
//         reset,
//         setError,
//     } = useForm<FormValues>({ mode: 'onBlur' });

//     const onSubmit = (data: FormValues) => {
//         if (isNaN(data.LoanAmount)) {
//             setError('LoanAmount', { type: 'NaN', message: 'Only numbers are eligible' });
//             return;
//         }
//         if (isNaN(data.TokenValuation)) {
//             setError('TokenValuation', { type: 'NaN', message: 'Only numbers are eligible' });
//             return;
//         }
//         closeMenu();
//         // reset();
//     };

//     return (
//         <div>
//             <h2 className="font-bold">Your Offer</h2>
//             <form className="flex flex-col space-y-8" onSubmit={handleSubmit(onSubmit)}>
//                 <label>
//                     <div className="flex">
//                         <input
//                             {...register('LoanAmount', {
//                                 required: 'Value is required',
//                                 valueAsNumber: true,
//                                 min: { value: 0.001, message: 'Value should be more' },
//                             })}
//                             placeholder="Loan Amount"
//                             className=" text-[16px] border-[2px] rounded-l-md border-r-0 border-solid border-black pl-2 w-[220px] h-[40px]"
//                         />
//                         <div className="flex items-center justify-center text-[16px] border-[2px] rounded-r-md rounded-sm border-solid border-black pl-2 w-[60px] h-[40px]">
//                             WETH
//                         </div>
//                     </div>
//                     <p className="text-[#FF0000] text-[14px]">
//                         {errors?.LoanAmount && errors.LoanAmount.message}
//                     </p>
//                 </label>
//                 <label>
//                     <div className="text-[24px] flex">
//                         <input
//                             {...register('TokenValuation', {
//                                 required: 'Value is required',
//                                 valueAsNumber: true,
//                                 min: { value: 0.001, message: 'Value should be more' },
//                             })}
//                             placeholder="Token Valuation"
//                             className=" text-[16px] border-[2px] rounded-l-md border-r-0 border-solid border-black pl-2 w-[220px] h-[40px]"
//                         />
//                         <div className="flex items-center justify-center text-[16px] border-[2px] rounded-r-md rounded-sm border-solid border-black pl-2 w-[60px] h-[40px]">
//                             WETH
//                         </div>
//                     </div>
//                     <p className="text-[#FF0000] text-[14px]">
//                         {errors?.TokenValuation && errors.TokenValuation.message}
//                     </p>
//                 </label>
//                 <label>
//                     <div className="text-[24px] flex">
//                         <input
//                             {...register('InjAddress', {
//                                 required: 'Value is required',
//                                 valueAsNumber: true,
//                                 min: { value: 1, message: 'Value should be more than 1' },
//                             })}
//                             placeholder="Your Injective Address"
//                             className=" text-[16px] border-[2px] rounded-md border-solid border-black pl-2 w-[280px] h-[40px]"
//                         />
//                     </div>
//                     <p className="text-[#FF0000] text-[14px]">
//                         {errors?.InjAddress && errors.InjAddress.message}
//                     </p>
//                 </label>
//                 <label>
//                     <select
//                         {...register('Duration')}
//                         className=" text-[16px] border-[2px] rounded-md border-solid border-black pl-2 w-[280px] h-[40px]">
//                         <option value={30}>30 days</option>
//                         <option value={60}>60 days</option>
//                         <option value={90}>90 days</option>
//                         <option value={180}>180 days</option>
//                     </select>
//                 </label>

//                 <input
//                     value="Submit Offer"
//                     type="submit"
//                     className="bg-black text-white rounded-md w-[135px] py-[12px] text-[14px] border-black border-solid border-[2px] "
//                 />
//             </form>
//         </div>
//     );
// };

export default CounterForm;
