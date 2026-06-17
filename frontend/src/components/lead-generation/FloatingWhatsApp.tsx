"use client"

import { MessageCircle } from "lucide-react"

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919953732860"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full bg-[#22C55E] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl animate-bounce"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="size-6" />
    </a>
  )
}