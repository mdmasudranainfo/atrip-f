import React, { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { BookText, Check } from 'lucide-react'

const HowToApplyVisa = ({howToApply}:any) => {
    return (
        <Card className="w-full border-none">
            <Accordion type="single" collapsible defaultValue="policies">
                <AccordionItem value="policies" className="border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex items-center gap-2">
                            <BookText color="blue" className="h-5 w-5 bg-blue-50" />
                            <h3 className="text-base font-bold">How To Apply</h3>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 border-none">
                        <Card className="w-full border-none bg-white">
                            <CardContent className='shadow-none border-none'>
                                <div className="space-y-6">
                                    <div
                                        className="text-base font-normal leading-7"
                                        dangerouslySetInnerHTML={{ __html: howToApply }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    )
}

export default HowToApplyVisa