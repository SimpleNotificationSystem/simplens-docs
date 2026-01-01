# SimpleNS Documentation

[![Built with Fumadocs](https://img.shields.io/badge/Built%20with-Fumadocs-blue)](https://fumadocs.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)

The official documentation website for [SimpleNS](https://github.com/SimpleNotificationSystem/simplens-core) - a self-hosted notification orchestration engine.

🌐 **Live Site**: [https://simplens.vercel.app](https://simplens.vercel.app)

---

## 📚 Documentation Structure

```
content/docs/
├── core/           # Core system documentation
│   ├── getting-started.mdx
│   ├── self-hosting.mdx
│   ├── architecture.mdx
│   ├── configuration.mdx
│   └── ...
├── plugins/        # Plugin ecosystem
│   ├── index.mdx
│   └── official-plugins/
└── sdk/            # Plugin SDK reference
    ├── building-plugin.mdx
    └── ...
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/SimpleNotificationSystem/simplens-docs.git
cd simplens-docs

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the documentation.

### Build for Production

```bash
npm run build
npm run start
```

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Documentation**: [Fumadocs](https://fumadocs.vercel.app/)
- **Styling**: Tailwind CSS
- **Content**: MDX with custom components

## 📄 License

This documentation is part of the SimpleNS project.
