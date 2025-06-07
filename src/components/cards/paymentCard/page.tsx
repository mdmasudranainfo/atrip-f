import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import React from 'react'

const PaymentCard = () => {
    return (
        <div className=' flex flex-col gap-4'>
            <div className=' w-full h-[380px] border border-white-frosted'>

            </div>
            <div className='flex items-center gap-2 text-dark'>
                <Checkbox className=' ' /> <p className=' font-normal text-sm leading-5'>By proceeding, I acknowledge that I have read and agree to the <span className=' font-semibold text-sm leading-5'>
                    Terms and Conditions</span> and <span className=' font-semibold text-sm leading-5'>Privacy Policy</span> </p>
            </div>

            <div className='mt-2'>
                <Button className="font-semibold h-12 bg-primary text-white px-6 hover:bg-primary/90" >Confirm Booking</Button>
            </div>
        </div>
    )
}

export default PaymentCard