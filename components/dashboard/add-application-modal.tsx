"use client"

import * as React from "react"
import { Plus } from "@phosphor-icons/react"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Application } from "@/hooks/use-applications"
import { ApplicationForm } from "./application-form"

interface ApplicationModalProps {
  application?: Application | null
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function AddApplicationModal({ 
  application, 
  trigger, 
  open: controlledOpen, 
  onOpenChange 
}: ApplicationModalProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const open = controlledOpen ?? internalOpen
  const setOpen = onOpenChange ?? setInternalOpen

  const isEditing = !!application

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger !== null && (
        <DialogTrigger 
          render={trigger || (
            <Button className="bg-[#6b21a8] text-white hover:bg-[#581c87]" size="sm">
              <Plus size={16} weight="bold" />
              Add Application
            </Button>
          )} 
          nativeButton={!trigger}
        />
      )}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Update Application" : "Add Application"}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Update the details of your job application." 
              : "Enter the details of your new job application here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <ApplicationForm 
          application={application} 
          onSuccess={() => setOpen(false)} 
          onCancel={() => setOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  )
}
