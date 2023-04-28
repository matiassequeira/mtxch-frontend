import React from 'react';
import { useForm } from 'react-hook-form';

interface FormValues {
    LoanAmount: number;
    TokenValuation: number;
    Duration: string;
    APR: number;
    InjAddress: string;
}

interface ListFormProps {
    listNft: (data: FormValues) => void;
}

const ListForm = (props: ListFormProps) => {
    const { listNft } = props;

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        setError,
    } = useForm<FormValues>({ mode: 'onBlur' });

    const onSubmit = (data: FormValues) => {
        if (isNaN(data.LoanAmount)) {
            setError('LoanAmount', { type: 'NaN', message: 'Only numbers are eligible' });
            return;
        }
        if (isNaN(data.TokenValuation)) {
            setError('TokenValuation', { type: 'NaN', message: 'Only numbers are eligible' });
            return;
        }

        if (isNaN(data.APR)) {
            setError('APR', { type: 'NaN', message: 'Only numbers are eligible' });
            return;
        }
        if (data.LoanAmount / data.TokenValuation > 0.6) {
            setError('LoanAmount', {
                type: '60',
                message: `Loan Amount can not be more than ${data.TokenValuation * 0.6}`,
            });
            return;
        }
        listNft(data);
        // reset();
    };

    return (
        <div>
            <strong className="text-[28px]">Desired Terms</strong>
            <form className="flex flex-col space-y-8 mt-10" onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <div className="text-[24px] flex">
                        <input
                            {...register('TokenValuation', {
                                required: 'Value is required',
                                valueAsNumber: true,
                                min: { value: 0, message: 'Value should be more than 0' },
                            })}
                            placeholder="Token Valuation"
                            className=" text-[20px] border-[2px] rounded-l-md border-r-0 border-solid border-black pl-2 w-[200px] h-[45px]"
                        />
                        <div className="flex items-center justify-center text-[20px] border-[2px] rounded-r-md rounded-sm border-solid border-black pl-2 w-[80px] h-[45px]">
                            WETH
                        </div>
                    </div>
                    <p className="text-[#FF0000] text-[14px]">
                        {errors?.TokenValuation && errors.TokenValuation.message}
                    </p>
                </label>
                <label>
                    <div className="text-[24px] flex">
                        <input
                            {...register('LoanAmount', {
                                required: 'Value is required',
                                valueAsNumber: true,
                                min: { value: 0, message: 'Value should be more than 0' },
                            })}
                            placeholder="Loan Amount"
                            className=" text-[20px] border-[2px] rounded-l-md border-r-0 border-solid border-black pl-2 w-[200px] h-[45px]"
                        />
                        <div className="flex items-center justify-center text-[20px] border-[2px] rounded-r-md rounded-sm border-solid border-black pl-2 w-[80px] h-[45px]">
                            WETH
                        </div>
                    </div>
                    <p className="text-[#FF0000] text-[14px]">
                        {errors?.LoanAmount && errors.LoanAmount.message}
                    </p>
                </label>
                <label>
                    <div className="text-[24px] flex">
                        <input
                            {...register('APR', {
                                required: 'Value is required',
                                valueAsNumber: true,
                                min: { value: 0, message: 'Value should between 0 and 100' },
                                max: { value: 100, message: 'Value should between 0 and 100' },
                            })}
                            placeholder="APR"
                            className=" text-[20px] border-[2px] rounded-l-md border-r-0 border-solid border-black pl-2 w-[200px] h-[45px]"
                        />
                        <div className="flex items-center justify-center text-[20px] border-[2px] rounded-r-md rounded-sm border-solid border-black pl-2 w-[80px] h-[45px]">
                            APR, %
                        </div>
                    </div>
                    <p className="text-[#FF0000] text-[14px]">
                        {errors?.APR && errors.APR.message}
                    </p>
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
                {/* <label>
                    <div className="text-[24px] flex">
                        <input
                            {...register('InjAddress', {
                                required: 'Value is required',
                            })}
                            placeholder="Your Injective Address"
                            className=" text-[20px] border-[2px] rounded-md border-solid border-black pl-2 w-[280px] h-[45px]"
                        />
                    </div>
                    <p className="text-[#FF0000] text-[14px]">
                        {errors?.InjAddress && errors.InjAddress.message}
                    </p>
                </label> */}

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
