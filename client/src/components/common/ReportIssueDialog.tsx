"use client"
import React from 'react'
import { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image'
const ReportIssueDialog
 = () => {


const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)


   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=' absolute right-55'>Report New Issue +</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report New Issue</DialogTitle>
        </DialogHeader>

        <form className="space-y-6">
          <div className=''>
            <Label className='py-1'>Name of Issue:</Label>
            <Input className='' placeholder='Broken Window...'/>
          </div>
          <div className='flex flex-col'>
            <Label className='py-1'>Describe issue...</Label>
            <Textarea
    placeholder="Explain issue in detail..."
    className="min-h-[160px] "
  />
  <div className=''>
            <Label className='py-1 my-1.5 '>Location:</Label>
            <Input placeholder='Main Building Room no. CR 1' className=' '/>
          </div>
       <div className="space-y-2  mt-4">
            <Label>Upload Image</Label>

            <Input  
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className=''
            />{preview && (
              <div className="relative h-40 w-full overflow-hidden rounded-lg border">
                <Image
                  src={preview}
                  alt="Issue preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
    
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className='
'>Cancel</Button>
            </DialogClose>
            <Button type="submit" className=''>Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ReportIssueDialog

