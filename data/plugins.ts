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
            "Send email notifications via Gmail SMTP using Nodemailer. Supports OAuth2 and App Password authentication.",
    },
    {
        name: "Mock",
        package: "@simplens/mock",
        description:
            "A mock notification provider for testing and development. Logs notifications without sending them.",
    },
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
