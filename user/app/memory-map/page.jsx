'use client'
import dynamic from "next/dynamic";

const MemoryMap = dynamic(() => import("@/components/memory-map"), {
  ssr: false
});


export default function MemoryMapPage() {
  return <MemoryMap />
}
