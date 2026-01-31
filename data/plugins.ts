export interface Plugin {
    name: string;
    package: string;
    description: string;
}

export const officialPlugins: Plugin[] = [
    {
        name: "Nodemailer Gmail",
        package: "@simplens/nodemailer-gmail",
        description:
            "Send email notifications via Gmail SMTP using Nodemailer.",
    },
    {
        name: "Mock",
        package: "@simplens/mock",
        description:
            "A mock notification provider for testing and development. Logs notifications without sending them.",
    },
    {
        name: "Resend",
        package: "@simplens/resend",
        description: "Send email notifications using Resend."
    }
];

export const communityPlugins: Plugin[] = [
    // Community plugins will be added here as they become available
    // Example:
    // {
    //   name: "Slack Notifications",
    //   package: "simplens-slack",
    //   description: "Send notifications to Slack channels and users.",
    // },
];
