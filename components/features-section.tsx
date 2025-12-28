import {
    Zap,
    Shield,
    Smartphone,
    Code2,
    Activity,
    GitBranch
} from "lucide-react"

export const FeaturesSection = () => {
    const features = [
        {
            icon: <Zap className="size-6 text-white" />,
            title: "Exponential Retries",
            description: "Automatically retry failed notifications with smart exponential backoff strategies to ensure delivery."
        },
        {
            icon: <Shield className="size-6 text-white" />,
            title: "Crash Recovery",
            description: "Resilient architecture that recovers from unexpected crashes without losing pending notifications."
        },
        {
            icon: <Smartphone className="size-6 text-white" />,
            title: "Multi-Channel",
            description: "Unified API for Email, SMS, Push, and Chat. Write once, deliver everywhere."
        },
        {
            icon: <Code2 className="size-6 text-white" />,
            title: "Type-Safe Design",
            description: "Built with TypeScript for full type safety, autocompletion, and developer confidence."
        },
        {
            icon: <GitBranch className="size-6 text-white" />,
            title: "Plugin Architecture",
            description: "Extensible system. Drop in new providers or write custom plugins in minutes."
        },
        {
            icon: <Activity className="size-6 text-white" />,
            title: "Real-time Status",
            description: "Track delivery status and events in real-time across all your channels."
        }
    ]

    return (
        <section className="bg-black text-white py-24 px-6 relative overflow-hidden" id="features">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Built for Scale & Reliability
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Everything you need to orchestrate reliable notification workflows at any scale.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-2xl bg-[#0a0a0a] border border-[#27272a] hover:border-[#3f3f46] transition-all duration-300 hover:shadow-lg hover:shadow-cyan-900/5 group"
                        >
                            <div className="mb-4 p-3 bg-gray-900/50 rounded-xl w-fit group-hover:bg-cyan-900/20 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-white">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
