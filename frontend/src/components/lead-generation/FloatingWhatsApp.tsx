"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { siteConfig } from "@/lib/utils"

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={`https://wa.me/${siteConfig.wa}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-30 flex size-14 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-xl transition-all hover:bg-[#20BD5A] hover:shadow-2xl hover:scale-105 active:scale-95"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", damping: 15, stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="size-7" />
    </motion.a>
  )
}
