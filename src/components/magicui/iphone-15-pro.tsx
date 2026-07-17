import * as React from "react"

export interface Iphone15ProProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Iphone15Pro = React.forwardRef<HTMLDivElement, Iphone15ProProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative mx-auto h-[600px] w-[290px] rounded-[3.5rem] border-[8px] border-black bg-black shadow-xl ${className || ""}`}
        {...props}
      >
        {/* Hardware Buttons */}
        <div className="absolute -left-[10px] top-[100px] h-[28px] w-[2px] rounded-l-md bg-zinc-800" />
        <div className="absolute -left-[10px] top-[145px] h-[50px] w-[2px] rounded-l-md bg-zinc-800" />
        <div className="absolute -left-[10px] top-[210px] h-[50px] w-[2px] rounded-l-md bg-zinc-800" />
        <div className="absolute -right-[10px] top-[165px] h-[75px] w-[2px] rounded-r-md bg-zinc-800" />

        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-3 z-50 h-[26px] w-[85px] -translate-x-1/2 rounded-full bg-black flex items-center justify-between px-2">
          {/* Camera lens */}
          <div className="h-3 w-3 rounded-full bg-zinc-900 shadow-inner overflow-hidden flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-900/40 blur-[1px]" />
          </div>
          {/* Sensor */}
          <div className="h-2 w-2 rounded-full bg-zinc-900 shadow-inner" />
        </div>

        {/* Inner bezel and screen container */}
        <div className="relative h-full w-full overflow-hidden rounded-[2.8rem] bg-zinc-950">
          {children}
        </div>
      </div>
    )
  }
)
Iphone15Pro.displayName = "Iphone15Pro"
