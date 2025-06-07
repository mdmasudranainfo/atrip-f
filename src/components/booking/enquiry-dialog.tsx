"use client"

import { ButtonHTMLAttributes, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { bookingAddEnquiry } from "@/lib/actions/booking-actions"
import { toast } from "sonner"
import { getErrorMessage } from "@/lib/handle-error"

// Define the validation schema with Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  note: z.string().optional(),
})

// Type for our form values
type FormValues = z.infer<typeof formSchema>


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  serviceId?: number|string
  serviceType?: string
}

export function EnquiryDialog({className, serviceId, serviceType}: Props) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Initialize React Hook Form with Zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      note: "",
    },
  })

  // Handle form submission
  const onSubmit = async (formData: FormValues) => {
   const payload = {
    service_id: serviceId,
    service_type: serviceType,
    enquiry_name: formData.name,
    enquiry_email: formData.email,
    enquiry_phone: formData.phone,
    enquiry_note: formData.note,
   }

   const {data, error} = await bookingAddEnquiry(payload)
   if(data?.status == 1) {
    toast.success(data.message)
    setSubmitted(true)
    setOpen(false)
   } else{
    toast.error(getErrorMessage(error))
   }
  }

  // Reset the form and submitted state
  const handleReset = () => {
    setSubmitted(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" type="button" className={cn("text-white bg-primary-dark", className)}>Send Enquiry</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between w-full">
            <DialogTitle className="text-2xl font-semibold text-slate-800">Enquiry</DialogTitle>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6">
          {!submitted ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Full Name" className="h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Email Address" type="email" className="h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Phone Number" type="tel" className="h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="Note" className="min-h-[100px] resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="secondary" onClick={() => setOpen(false)} className="min-w-[100px]">
                      Close
                    </Button>
                    <Button type="button" onClick={form.handleSubmit(onSubmit)} className="min-w-[100px] bg-[#152042] hover:bg-[#1c2a56] text-white">
                      Send now
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          ) : (
            <div className="py-8 text-center">
              <p className="text-green-600 text-lg mb-6">Thank you for contacting us! We will be in contact shortly.</p>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="secondary" onClick={() => setOpen(false)} className="min-w-[100px]">
                  Close
                </Button>
                <Button
                  type="button"
                  onClick={handleReset}
                  className="min-w-[100px] bg-[#152042] hover:bg-[#1c2a56] text-white"
                >
                  New Enquiry
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

