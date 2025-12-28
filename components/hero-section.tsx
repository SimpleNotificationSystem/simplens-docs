import Link from "next/link"
import { Button } from "./ui/button"
import { Github, ArrowRight } from "lucide-react"
import IntegrationsSection from "./integration"

export const HeroSection = () => {
    return (
        <section className="min-h-screen bg-[#0a0a0a] flex items-center">
            <div className="w-full max-w-7xl mx-auto px-8 py-32 pt-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Tagline, Subtitle, Buttons */}
                    <div>
                        {/* Tagline */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-8 bg-linear-to-r from-[#789fec] to-[#00008c] bg-clip-text text-transparent">
                            Orchestrate.<br />
                            Deliver.<br />
                            Scale.
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-[#a1a1aa] max-w-xl mb-12 leading-relaxed">
                            Plugin-based notification engine with exponential retries, crash recovery, and multi-channel support out of the box.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-row gap-4 items-center">
                            <Button
                                className="bg-white text-black hover:bg-gray-100 px-6 py-5 text-base font-medium rounded-md transition-all duration-200"
                                asChild
                            >
                                <Link href="https://github.com/SimpleNotificationSystem/simplens-core">
                                    <Github className="mr-2 h-5 w-5" />
                                    Star on GitHub
                                </Link>
                            </Button>
                            <Button
                                variant="ghost"
                                className="text-white hover:text-white hover:bg-transparent px-6 py-5 text-base font-medium"
                                asChild
                            >
                                <Link href="/docs">
                                    Get started
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right Side - Integration Section */}
                    <div>
                        <IntegrationsSection />
                    </div>
                </div>
            </div>
        </section>
    )
}

