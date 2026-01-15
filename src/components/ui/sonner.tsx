"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-5 text-green-500" />,
        info: <InfoIcon className="size-5 text-blue-500" />,
        warning: <TriangleAlertIcon className="size-5 text-amber-500" />,
        error: <OctagonXIcon className="size-5 text-red-500" />,
        loading: <Loader2Icon className="size-5 animate-spin text-[#FF5200]" />,
      }}
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border-2 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-xl group-[.toaster]:px-4 group-[.toaster]:py-3 font-sans",
          title: "group-[.toast]:font-semibold group-[.toast]:text-gray-900",
          description: "group-[.toast]:text-gray-500 group-[.toast]:text-sm",
          actionButton: "group-[.toast]:bg-[#FF5200] group-[.toast]:text-white group-[.toast]:rounded-lg group-[.toast]:font-medium group-[.toast]:hover:bg-[#E04800]",
          cancelButton: "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-600 group-[.toast]:rounded-lg",
          success: "group-[.toaster]:border-green-300 group-[.toaster]:bg-green-50",
          error: "group-[.toaster]:border-red-300 group-[.toaster]:bg-red-50",
          info: "group-[.toaster]:border-blue-300 group-[.toaster]:bg-blue-50",
          warning: "group-[.toaster]:border-amber-300 group-[.toaster]:bg-amber-50",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
