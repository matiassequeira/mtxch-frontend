import React from 'react';
import Button from './Button';
import { useForm } from 'react-hook-form';

interface FormValues {
    LoanAmount: number;
    Duration: number;
    APR: number;
}

const ListForm = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <div>
            <strong className="text-[28px]">Desired Terms</strong>
            <form className="flex flex-col space-y-8 mt-10" onSubmit={handleSubmit(onSubmit)}>
                <label className="text-[24px] flex">
                    <input
                        {...register('LoanAmount', {
                            required: true,
                            valueAsNumber: true,
                            min: 0.00001,
                        })}
                        placeholder="Loan Amount"
                        className=" text-[20px] border-[2px] rounded-l-md border-r-0 border-solid border-black pl-2 w-[200px] h-[45px]"
                    />
                    <div className="flex items-center justify-center text-[20px] border-[2px] rounded-r-md rounded-sm border-solid border-black pl-2 w-[80px] h-[45px]">
                        WETH
                    </div>
                </label>
                <label>
                    <select
                        {...register('Duration')}
                        className=" text-[20px] border-[2px] rounded-md border-solid border-black pl-2 w-[280px] h-[45px]">
                        <option value={30}>30 days</option>
                        <option value={60}>60 days</option>
                        <option value={90}>90 days</option>
                        <option value={180}>180 days</option>
                    </select>
                </label>
                <label className="text-[24px] flex">
                    <input
                        {...register('APR', { required: true, valueAsNumber: true, min: 1 })}
                        placeholder="APR"
                        className=" text-[20px] border-[2px] rounded-l-md border-r-0 border-solid border-black pl-2 w-[200px] h-[45px]"
                    />
                    <div className="flex items-center justify-center text-[20px] border-[2px] rounded-r-md rounded-sm border-solid border-black pl-2 w-[80px] h-[45px]">
                        APR, %
                    </div>
                </label>

                <input
                    value="List"
                    type="submit"
                    className="bg-black text-white rounded-md w-[135px] py-[12px] text-[14px] border-black border-solid border-[2px] "
                />
            </form>
        </div>
    );
};

export default ListForm;
