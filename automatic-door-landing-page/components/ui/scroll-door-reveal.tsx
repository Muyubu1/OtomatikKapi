"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollDoorRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode; // The content revealed behind the door
  doorImageUrl: string; // Texture or image of the industrial door
  doorType?: "vertical" | "horizontal"; // Direction of opening
}

const ScrollDoorReveal = React.forwardRef<HTMLDivElement, ScrollDoorRevealProps>(
  ({ children, doorImageUrl, doorType = "vertical", className, ...props }, ref) => {
    const targetRef = React.useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start start", "end start"],
    });

    // CONFIGURATION:
    // Vertical: Moves Y from 0% to -100% (Upwards)
    // Horizontal: Moves X from 0% to -100% (Leftwards)
    // 0 = Closed, 1 = Open
    const doorMovement = useTransform(
      scrollYProgress,
      [0, 0.85], // Animation completes when scroll is 85% through the section
      ["0%", "-100%"]
    );

    // Optional: Add a shadow fade-out effect as door opens
    const shadowOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0]);

    return (
      // h-[250vh] creates the scroll distance required to complete the animation
      <div ref={targetRef} className={cn("relative h-[250vh]", className)} {...props}>
        
        {/* Sticky Container: Holds the viewport stationary while scrolling */}
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-gray-900">
          
          {/* LAYER 1: CONTENT (The Reveal) */}
          {/* This sits behind the door */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
             {children}
          </div>

          {/* LAYER 2: THE DOOR (The Cover) */}
          <motion.div
            style={{ 
              y: doorType === "vertical" ? doorMovement : 0,
              x: doorType === "horizontal" ? doorMovement : 0,
            }}
            className="absolute inset-0 z-20 w-full h-full bg-repeat"
          >
            {/* Door Texture Container */}
            <div 
                className="w-full h-[110%] bg-cover bg-center relative shadow-2xl"
                style={{ backgroundImage: `url(${doorImageUrl})` }}
            >
                {/* Optional: Overlay to simulate panel grooves/sections */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(0,0,0,0.5)_95%,rgba(0,0,0,0.8)_100%)] bg-[length:100%_10vh]" />
                
                {/* Bottom Rubber Seal Detail */}
                <div className="absolute bottom-0 w-full h-6 bg-black/90 shadow-lg border-t border-gray-800" />
            </div>
          </motion.div>

          {/* LAYER 3: SHADOW OVERLAY */}
          {/* Adds depth when the door is closed */}
          <motion.div 
            style={{ opacity: shadowOpacity }}
            className="absolute inset-0 z-10 bg-black pointer-events-none"
          />

        </div>
      </div>
    );
  }
);

ScrollDoorReveal.displayName = "ScrollDoorReveal";

export { ScrollDoorReveal };
