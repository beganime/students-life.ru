# Studs Life - Portal & CRM Integration

This is the Next.js frontend application for **Studs Life**, integrated with Strapi CMS and the `manager-sl.ru` CRM.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Framer Motion
- **CMS**: Strapi v4 (included in `studs-life-cms` folder)
- **Database**: SQLite / PostgreSQL
- **Integrations**: Google Sheets Apps Script, Custom CRM API

## Getting Started

First, ensure you have copied `.env.example` to `.env.local` and filled in the required API keys.

```bash
cp .env.example .env.local
```

### Running Locally (Frontend Only)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Running via Docker Compose (Full Stack)

To run both the Next.js frontend and Strapi CMS simultaneously:

```bash
# Make sure .env is configured in both the root directory and the studs-life-cms directory
docker-compose up -d --build
```

- Frontend will be available at: [http://localhost:3000](http://localhost:3000)
- Strapi Admin will be available at: [http://localhost:1337](http://localhost:1337)

## Project Structure
- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - Reusable UI components and Forms
- `src/lib/` - Utility functions, CRM connector, and Google Sheets connector
- `src/dictionaries/` - i18n translation files (EN, RU, TK)
- `studs-life-cms/` - Strapi Management Backend

## Deployment
For deployment instructions, please refer to the provided `handover_guide.md` or deploy directly using Docker Compose on any standard VPS.
