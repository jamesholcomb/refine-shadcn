import React from "react"
import { cn } from "@ferdiunal/refine-shadcn/lib/utils"

export interface AuthLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  logo?: React.ReactNode
  backgroundImage?: string
  className?: string
}

export function AuthLayout({
  children,
  title,
  subtitle,
  logo,
  backgroundImage,
  className,
}: AuthLayoutProps) {
  return (
    <div className={cn("container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0", className)}>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div
          className="absolute inset-0 bg-zinc-900"
          style={{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-20 flex items-center text-lg font-medium">
          {logo || (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          )}
          {title}
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            {subtitle && <p className="text-lg">&ldquo;{subtitle}&rdquo;</p>}
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {children}
        </div>
      </div>
    </div>
  )
}
