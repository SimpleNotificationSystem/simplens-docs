"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
    Plus,
    Minus,
    BookOpen,
    Github
} from "lucide-react"

interface FAQItemProps {
    question: string
    answer: string
    isOpen: boolean
    onToggle: () => void
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
    return (
        <div className="border-b border-zinc-800 last:border-0">
            <button
                onClick={onToggle}
                className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-blue-400"
            >
                <span className="font-medium text-white pr-4">{question}</span>
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-400">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-5 text-zinc-400 leading-relaxed">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const faqs = [
        {
            question: "Is SimpleNS free?",
            answer: "Yes! SimpleNS is 100% open-source under the MIT License. Self-host it for free with no hidden costs or usage limits.",
        },
        {
            question: "How does it compare to SendGrid or Twilio?",
            answer: "SimpleNS is orchestration, not a provider. It manages retries, scheduling, and crash recovery while delegating actual delivery to providers like SendGrid/Twilio via plugins. You can even use multiple providers simultaneously.",
        },
        {
            question: "Can I use my existing email/SMS provider?",
            answer: "Absolutely! Install the appropriate plugin or build a custom one with our SDK. If a plugin doesn't exist, create one in minutes using @simplens/create-simplens-plugin.",
        },
        {
            question: "What happens if my server crashes mid-delivery?",
            answer: "The recovery service automatically detects ghost delivery, orphaned and stuck notifications. It tries to auto resolve them if possible, else it notifies via the admin dashboard. No messages are lost thanks to the SimpleNS Recovery System",
        },
        {
            question: "How do I scale for high volume?",
            answer: "Run multiple processor instances and scale horizontally. You can scale email workers independently from SMS workers based on your traffic patterns.",
        },
        {
            question: "Do I need to host it myself?",
            answer: "Yes, SimpleNS is self-hosted for maximum control, data privacy, and no vendor lock-in. Deploy with Docker Compose in minutes.",
        },
        {
            question: "What channels are supported?",
            answer: "Email, SMS, WhatsApp, push notifications, and more via plugins. You can build custom plugins for any channel using the SDK.",
        },
        {
            question: "Can I schedule notifications for future delivery?",
            answer: "Yes! Use the scheduled_at field with ISO 8601 timestamps. Notifications are queued in Redis and processed at the scheduled time.",
        },
        {
            question: "How do retries work?",
            answer: "Automatic exponential backoff retries with configurable limits. If a delivery fails, SimpleNS retries with increasing delays (2s, 4s, 8s, etc.).",
        },
        {
            question: "Is there a dashboard for monitoring?",
            answer: "Yes! A full-featured admin dashboard is included with analytics, event explorer, failed events management, alerts, and an interactive Payload Studio.",
        },
    ]

    return (
        <section className="relative overflow-hidden py-24 px-6" id="faq">
            {/* Background */}
            {/* <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute right-1/4 top-0 h-96 w-96 rounded-full bg-blue-900/10 blur-3xl" />
            </div> */}

            <div className="relative z-10 mx-auto max-w-3xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
                        Frequently Asked <span className="bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Questions</span>
                    </h2>
                    <p className="text-lg text-zinc-400">
                        Everything you need to know about SimpleNS
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 md:p-8"
                >
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </motion.div>

                {/* Still Have Questions Callout */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-12 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center"
                >
                    <p className="mb-4 text-lg font-medium text-white">
                        Still have questions?
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/docs/core"
                            className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-blue-500 hover:text-white"
                        >
                            <BookOpen className="h-4 w-4" />
                            Read the Docs
                        </Link>
                        <Link
                            href="https://github.com/SimpleNotificationSystem/simplens-core/issues"
                            className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-blue-500 hover:text-white"
                        >
                            <Github className="h-4 w-4" />
                            GitHub Issues
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
