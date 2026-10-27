"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const carContainerRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const wheelLeftRef = useRef<HTMLDivElement>(null);
  const wheelRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' }
      );

      if (metricsRef.current) {
        tl.fromTo(
          metricsRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
          '-=0.6'
        );
      }

      tl.fromTo(
        carContainerRef.current,
        { opacity: 0, scale: 0.9, x: -100 },
        { opacity: 1, scale: 1, x: 0, duration: 1.5, ease: 'power4.out' },
        '-=1'
      );

      gsap.to(carRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        },
        x: '80vw',
        ease: 'none',
      });

      const wheels = [wheelLeftRef.current, wheelRightRef.current];
      gsap.to(wheels, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
        rotate: 720,
        ease: 'none',
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-zinc-950 text-white w-full min-h-[200vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between p-8 md:p-16 select-none z-10">
        
        <div className="w-full text-center mt-12">
          <h1 
            ref={headlineRef} 
            className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-[0.3em] uppercase text-zinc-100 drop-shadow-md"
          >
            W E L C O M E &nbsp; I T Z &nbsp; F I Z Z
          </h1>
        </div>

        <div ref={carContainerRef} className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-40 flex items-center px-4">
          <div className="w-full h-[2px] bg-zinc-800 relative">
            <div ref={carRef} className="absolute -top-16 left-0 w-48 h-20 group">
              <div className="w-full h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-t-2xl relative shadow-xl">
                <div className="absolute top-2 right-4 w-16 h-5 bg-cyan-200/30 rounded-tr-lg rounded-bl-sm transform skew-x-12"></div>
                <div className="absolute top-2 left-6 w-12 h-5 bg-cyan-200/30 rounded-tl-sm transform -skew-x-12"></div>
              </div>
              <div className="w-full h-4 bg-zinc-800 rounded-b-md"></div>
              <div ref={wheelLeftRef} className="absolute bottom-1 left-6 w-8 h-8 bg-zinc-900 border-4 border-zinc-700 rounded-full flex items-center justify-center shadow-md">
                <div className="w-1 h-5 bg-zinc-400 rounded-full"></div>
              </div>
              <div ref={wheelRightRef} className="absolute bottom-1 right-8 w-8 h-8 bg-zinc-900 border-4 border-zinc-700 rounded-full flex items-center justify-center shadow-md">
                <div className="w-1 h-5 bg-zinc-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div 
          ref={metricsRef} 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl mx-auto mb-8 bg-zinc-900/40 backdrop-blur-md p-6 rounded-xl border border-zinc-800/80"
        >
          <div className="flex flex-col border-l-2 border-red-500 pl-4">
            <span className="text-2xl sm:text-4xl font-black text-white">58%</span>
            <span className="text-xs sm:text-sm text-zinc-400 mt-1">Increase in pick up point use</span>
          </div>
          <div className="flex flex-col border-l-2 border-red-500 pl-4">
            <span className="text-2xl sm:text-4xl font-black text-white">23%</span>
            <span className="text-xs sm:text-sm text-zinc-400 mt-1">Decreased in customer phone calls</span>
          </div>
          <div className="flex flex-col border-l-2 border-red-500 pl-4">
            <span className="text-2xl sm:text-4xl font-black text-white">27%</span>
            <span className="text-xs sm:text-sm text-zinc-400 mt-1">Increase in pick up point use</span>
          </div>
          <div className="flex flex-col border-l-2 border-red-500 pl-4">
            <span className="text-2xl sm:text-4xl font-black text-white">40%</span>
            <span className="text-xs sm:text-sm text-zinc-400 mt-1">Decreased in customer phone calls</span>
          </div>
        </div>

      </div>

      <div className="h-screen bg-zinc-950 pointer-events-none"></div>
    </div>
  );
}