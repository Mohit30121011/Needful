"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-5 text-[#FF5200]" />,
        info: <InfoIcon className="size-5 text-[#FF5200]" />,
        warning: <TriangleAlertIcon className="size-5 text-amber-500" />,
        error: <OctagonXIcon className="size-5 text-red-500" />,
        loading: <Loader2Icon className="size-5 animate-spin text-[#FF5200]" />,
      }}
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border-l-4 group-[.toaster]:border-l-[#FF5200] group-[.toaster]:border group-[.toaster]:border-gray-100 group-[.toaster]:shadow-xl group-[.toaster]:shadow-orange-100/50 group-[.toaster]:rounded-xl group-[.toaster]:px-4 group-[.toaster]:py-3 font-sans",
          title: "group-[.toast]:font-bold group-[.toast]:text-gray-900",
          description: "group-[.toast]:text-gray-500 group-[.toast]:text-sm",
          actionButton: "group-[.toast]:bg-[#FF5200] group-[.toast]:text-white group-[.toast]:rounded-lg group-[.toast]:font-bold group-[.toast]:hover:bg-[#E04800] group-[.toast]:shadow-md",
          cancelButton: "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-600 group-[.toast]:rounded-lg group-[.toast]:font-medium",
          success: "group-[.toaster]:border-l-[#FF5200] group-[.toaster]:bg-white",
          error: "group-[.toaster]:border-l-red-500 group-[.toaster]:bg-white",
          info: "group-[.toaster]:border-l-[#FF5200] group-[.toaster]:bg-white",
          warning: "group-[.toaster]:border-l-amber-500 group-[.toaster]:bg-white",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

