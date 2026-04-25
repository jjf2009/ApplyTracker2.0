"use client"

import * as React from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Application } from "@/hooks/use-applications"

interface ApplicationFormProps {
  application?: Application | null
  onSuccess: () => void
  onCancel: () => void
}

export function ApplicationForm({ application, onSuccess, onCancel }: ApplicationFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const queryClient = useQueryClient()

  const isEditing = !!application

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      company: formData.get("company"),
      role: formData.get("role"),
      status: formData.get("status"),
      method: formData.get("method"),
      appliedDate: application?.applied_date || new Date().toISOString(),
      salaryRange: formData.get("salaryRange") || null,
      interviewDate: formData.get("interviewDate") ? new Date(formData.get("interviewDate") as string).toISOString() : null,
      location: formData.get("location") || null,
      notes: formData.get("notes") || null,
    }

    try {
      const url = isEditing ? `/api/applications?id=${application.id}` : "/api/applications"
      const method = isEditing ? "PATCH" : "POST"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error(`Failed to ${isEditing ? "update" : "add"} application`)
      }

      queryClient.invalidateQueries({ queryKey: ["applications"] })
      onSuccess()
    } catch (error) {
      console.error(error)
      alert(`Failed to ${isEditing ? "update" : "add"} application. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4 text-left">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              defaultValue={application?.company}
              placeholder="Google"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              name="role"
              defaultValue={application?.role}
              placeholder="Software Engineer"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="salaryRange">Salary Range</Label>
            <Input
              id="salaryRange"
              name="salaryRange"
              defaultValue={application?.salary_range || ""}
              placeholder="$100k - $120k"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              defaultValue={application?.location || ""}
              placeholder="Remote / New York"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue={application?.status || "APPLIED"} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="APPLIED">Applied</SelectItem>
                <SelectItem value="INTERVIEW">Interview</SelectItem>
                <SelectItem value="OFFER">Offer</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="method">Method</Label>
            <Select name="method" defaultValue={application?.method || "OFFICAL MEANS"} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OFFICAL MEANS">Official Means</SelectItem>
                <SelectItem value="COLD EMAIL">Cold Email</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="interviewDate">Interview Date (Optional)</Label>
          <Input
            id="interviewDate"
            name="interviewDate"
            type="datetime-local"
            defaultValue={application?.interview_date ? new Date(application.interview_date).toISOString().slice(0, 16) : ""}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            defaultValue={application?.notes || ""}
            placeholder="Add any extra details..."
          />
        </div>
      </div>
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-[#6b21a8] text-white hover:bg-[#581c87]"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : isEditing ? "Update Application" : "Save Application"}
        </Button>
      </div>
    </form>
  )
}
