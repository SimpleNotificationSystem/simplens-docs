import { cn } from '@/lib/utils'
import { MessageCircle, Mail, Bell, Smartphone, Webhook, Slack } from 'lucide-react';
import Image from "next/image"

export default function IntegrationsSection() {
    return (
        <section    >
            <div className="bg-[#0a0a0a] py-24 md:py-32">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="relative mx-auto flex max-w-sm items-center justify-between">
                        <div className="space-y-6">
                            <IntegrationCard position="left-top">
                                <MessageCircle className="size-6 text-white" />
                            </IntegrationCard>
                            <IntegrationCard position="left-middle">
                                <Mail className="size-6 text-white" />
                            </IntegrationCard>
                            <IntegrationCard position="left-bottom">
                                <Smartphone className="size-6 text-white" />
                            </IntegrationCard>
                        </div>
                        <div className="mx-auto my-2 flex w-fit justify-center gap-2">
                            <div className="bg-[#18181b] relative z-20 rounded-2xl border border-[#27272a] p-1">
                                <IntegrationCard
                                    className="bg-[#18181b] size-16 border-[#3f3f46] shadow-xl shadow-white/5"
                                    isCenter={true}>
                                    <Image
                                        src="/icon.png"
                                        alt="SimpleNS Logo"
                                        width={40}
                                        height={40}
                                        className="object-contain"
                                    />
                                </IntegrationCard>
                            </div>
                        </div>
                        <div
                            role="presentation"
                            className="absolute inset-1/3 bg-[radial-gradient(var(--dots-color)_1px,transparent_1px)] opacity-50 [--dots-color:white] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

                        <div className="space-y-6">
                            <IntegrationCard position="right-top">
                                <Bell className="size-6 text-white" />
                            </IntegrationCard>
                            <IntegrationCard position="right-middle">
                                <Webhook className="size-6 text-white" />
                            </IntegrationCard>
                            <IntegrationCard position="right-bottom">
                                <Slack className="size-6 text-white" />
                            </IntegrationCard>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const IntegrationCard = ({ children, className, position, isCenter = false }: { children: React.ReactNode; className?: string; position?: 'left-top' | 'left-middle' | 'left-bottom' | 'right-top' | 'right-middle' | 'right-bottom'; isCenter?: boolean }) => {
    return (
        <div className={cn('bg-[#18181b] relative flex size-12 rounded-xl border border-[#27272a] text-white', className)}>
            <div className={cn('relative z-20 m-auto size-fit *:size-6', isCenter && '*:size-8')}>{children}</div>
            {position && !isCenter && (
                <div
                    className={cn(
                        'bg-linear-to-r to-white/50 absolute z-10 h-px',
                        position === 'left-top' && 'left-full top-1/2 w-[130px] origin-left rotate-25',
                        position === 'left-middle' && 'left-full top-1/2 w-[120px] origin-left',
                        position === 'left-bottom' && 'left-full top-1/2 w-[130px] origin-left rotate-[-25deg]',
                        position === 'right-top' && 'bg-linear-to-l to-white/50 right-full top-1/2 w-[130px] origin-right rotate-[-25deg]',
                        position === 'right-middle' && 'bg-linear-to-l to-white/50 right-full top-1/2 w-[120px] origin-right',
                        position === 'right-bottom' && 'bg-linear-to-l to-white/50 right-full top-1/2 w-[130px] origin-right rotate-25'
                    )}
                />
            )}
        </div>
    )
}