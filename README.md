# Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

Personal developer portfolio built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion, live at [winstonajr.vercel.app](https://winstonajr.vercel.app).

## Features

- **App Router architecture**: built on Next.js 16 with Turbopack and React 19.
- **Animations & icons**: motion transitions with `framer-motion`, `react-intersection-observer`, `lucide-react`, and `react-icons`.
- **Responsive styling**: utility-first layout powered by Tailwind CSS v4.

## Quick Start

### Prerequisites

- Node.js 20+
- npm

### Running Locally

```bash
git clone https://github.com/winstonajr/portfolio.git
cd portfolio
npm install
npm run dev
```

Open `http://localhost:3000`.

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```text
portfolio/
├── app/                # Next.js App Router pages, layout, and global styles
├── components/
│   ├── layout/         # Navigation and layout components
│   ├── sections/       # Page sections
│   └── ui/             # Reusable UI primitives
├── data/               # Portfolio content and project data
├── hooks/              # Custom React hooks
├── public/             # Static assets
├── types/              # TypeScript type definitions
└── package.json
```

## Development

```bash
npm run lint
npm run build
```
