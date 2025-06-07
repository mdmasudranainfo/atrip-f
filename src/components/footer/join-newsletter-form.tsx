"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ArrowRight, Loader2, Mail } from "lucide-react"
import { subscribeEmail } from "@/lib/actions/subscribe-action"

export const emailSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
})

export type EmailSchema = z.infer<typeof emailSchema>

export function JoinNewsletterForm() {
  const [loading, setLoading] = React.useState(false)

  // react-hook-form
  const form = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(payload: EmailSchema) {
    setLoading(true)
    try {
        const {data, error} = await subscribeEmail(payload.email)
        if(data) {
            toast.success("You have been subscribed to our newsletter.")
            form.reset()
        } else {
            toast.error(error)
        }
    } catch (err) {
      toast.error("An unknown error occurred. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className="space-y-3">
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormControl>
                    <div className="relative">
                        <Input
                            type="email"
                            placeholder="Enter email address"
                            className="h-12 w-full border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-base placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:placeholder:text-slate-500"
                            {...field}
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <Mail size={18} />
                        </div>
                    </div>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <Button className="group h-12 w-full bg-blue-600 text-base font-semibold text-white transition-all hover:bg-blue-700"
                type="submit"
                disabled={loading}
            >
                
                {loading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Processing...
                    </>
                    ) : (
                                    "Subscribe"
                    )}

                                  
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
        </div>
      </form>
    </Form>
  )
}
