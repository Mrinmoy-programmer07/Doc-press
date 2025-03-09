"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useWeb3 } from "@/hooks/use-web3"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  studentName: z.string().min(2, {
    message: "Student name must be at least 2 characters.",
  }),
  course: z.string().min(2, {
    message: "Course name must be at least 2 characters.",
  }),
  university: z.string().min(2, {
    message: "University name must be at least 2 characters.",
  }),
  issueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid date.",
  }),
})

type FormValues = z.infer<typeof formSchema>

type CertificateFormProps = {
  type: "issue" | "verify" | "revoke"
  onSuccess?: (result: boolean) => void
}

export function CertificateForm({ type, onSuccess }: CertificateFormProps) {
  const { issueCertificate, verifyCertificate, revokeCertificate, address } = useWeb3()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "",
      course: "",
      university: "",
      issueDate: new Date().toISOString().split("T")[0],
    },
  })

  const onSubmit = async (values: FormValues) => {
    if (!address) {
      return
    }

    setIsLoading(true)
    let result = false

    try {
      if (type === "issue") {
        result = await issueCertificate(values.studentName, values.course, values.university, values.issueDate)
      } else if (type === "verify") {
        result = await verifyCertificate(values.studentName, values.course, values.university, values.issueDate)
      } else if (type === "revoke") {
        result = await revokeCertificate(values.studentName, values.course, values.university, values.issueDate)
      }

      if (onSuccess) {
        onSuccess(result)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const buttonText = {
    issue: "Issue Certificate",
    verify: "Verify Certificate",
    revoke: "Revoke Certificate",
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="studentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>Full name of the student as it appears on the certificate.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <FormControl>
                <Input placeholder="Computer Science" {...field} />
              </FormControl>
              <FormDescription>The course or degree program completed.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="university"
          render={({ field }) => (
            <FormItem>
              <FormLabel>University</FormLabel>
              <FormControl>
                <Input placeholder="University of Blockchain" {...field} />
              </FormControl>
              <FormDescription>The institution that issued the certificate.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="issueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issue Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>The date when the certificate was issued.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading || !address} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            buttonText[type]
          )}
        </Button>
      </form>
    </Form>
  )
}

