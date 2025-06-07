import { Dot } from 'lucide-react'
import React from 'react'

const TransportBookInfo = () => {
    return (
        <div className=' bg-white text-dark p-7 rounded-lg border border-white-frosted'>
            <div className='flex items-center gap-2'>
                <h2 className='font-semibold leading-6 text-[24px]'>
                    BMW 520i M Sport
                    <span className='font-medium leading-8 text-base text-primary ps-2'>(Transport)</span>
                </h2>
                <span className='font-medium leading-8 text-base'>4 Nights / 7 Days</span>
            </div>
            <p className=' text-base font-normal leading-5 mt-1'>
                From Dubai to Copenhagen, Denmark, Date Jan 10, 2025, Two Guest
            </p>

            <div className=' mt-1.5 font-medium text-sm leading-[22px] text-primary flex items-center'>
                <p>Cancelation Policy</p>
                <span>
                    <Dot className='' />
                </span>
                <p>See your itinerary</p>
            </div>
        </div>
    )
}

export default TransportBookInfo