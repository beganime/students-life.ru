# Strapi CMS + Next.js Integration

## 🚀 Quick Start

### 1. Start Strapi CMS

```bash
cd studs-life-cms
npm run develop
```

Strapi admin panel will open at: **http://localhost:1337/admin**

**First time setup:**
1. Create admin account:
   - Email: admin@studentslife.com
   - Password: [choose a strong password]
2. The content types (Country, City) are already configured!

### 2. Start Next.js

```bash
# In a new terminal
cd studs-life-test
npm run dev
```

Next.js will run at: **http://localhost:3000**

### 3. Add Environment Variables

Create `.env.local` in the Next.js project root:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=
```

## 📊 Import City Data

### Option 1: Manual Entry (Recommended for testing)

1. Go to Strapi admin: http://localhost:1337/admin
2. Click **Content Manager** → **Country** → **Create new entry**
3. Fill in:
   - Name: Россия
   - Slug: russia (auto-generated)
   - Locale: Russian (ru)
4. Click **Save** and **Publish**
5. Repeat for cities

### Option 2: Bulk Import (For all 139 pages)

1. Edit `scripts/data/cities-data.ts` and add all your city data
2. Run the import script:

```bash
npx tsx scripts/import-cities.ts
```

## 🌐 URL Structure

Cities will be accessible at:

```
http://localhost:3000/en/russia/moscow
http://localhost:3000/ru/russia/moscow
http://localhost:3000/tr/russia/moscow
```

## 📝 Content Type Structure

### Country
- name (Text) - Country name
- slug (UID) - URL-friendly slug
- description (Text) - Optional description
- featured (Boolean) - Show on homepage
- Localized: ✅ (en, ru, tr)

### City
- name (Text) - City name
- slug (UID) - URL-friendly slug
- title (Text) - Page title
- intro (Rich Text) - Introduction
- economyContent (Rich Text) - Economy section
- housingContent (Rich Text) - Housing section
- transportContent (Rich Text) - Transport section
- climateContent (Rich Text) - Climate section
- climateTable (JSON) - Climate data table
- conclusion (Rich Text) - Conclusion
- images (Media) - City images
- featured (Boolean) - Show on homepage
- metaDescription (Text) - SEO description
- country (Relation) - Belongs to country
- Localized: ✅ (en, ru, tr)

## 🎨 Climate Table Format

```json
{
  "seasons": [
    {
      "name": "❄️ Зима (ноябрь–март)",
      "temperature": "от –10°C до –20°C",
      "features": "Холодная и снежная погода"
    },
    {
      "name": "☀️ Лето (июнь–август)",
      "temperature": "+20°C…+25°C",
      "features": "Короткое, умеренно тёплое"
    }
  ]
}
```

## 🚢 Deployment

### Preview (Vercel + Railway)

#### 1. Deploy Strapi to Railway

1. Push Strapi to GitHub:
```bash
cd studs-life-cms
git init
git add .
git commit -m "Initial Strapi setup"
git push
```

2. Go to [Railway.app](https://railway.app)
3. New Project → Deploy from GitHub
4. Select `studs-life-cms` repo
5. Add PostgreSQL database
6. Set environment variables:
   - `NODE_ENV=production`
   - `DATABASE_CLIENT=postgres`

7. Get your Railway URL (e.g., `https://your-app.up.railway.app`)

#### 2. Deploy Next.js to Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Import `studs-life-test` repo
3. Add environment variable:
   - `NEXT_PUBLIC_STRAPI_URL=https://your-app.up.railway.app`
4. Deploy!

Your preview site will be at: `https://your-project.vercel.app`

### Production (Hostinger)

See `docs/hostinger-deployment.md` for detailed instructions.

## 📚 Next Steps

1. ✅ Test local setup
2. ✅ Add sample city data
3. ✅ Deploy to Railway + Vercel for client preview
4. ✅ Get client approval
5. ✅ Migrate to Hostinger for production

## 🆘 Troubleshooting

### Strapi won't start
- Make sure port 1337 is not in use
- Delete `studs-life-cms/.tmp` and restart

### Cities not showing in Next.js
- Make sure cities are **Published** in Strapi (not just saved)
- Check that `NEXT_PUBLIC_STRAPI_URL` is set correctly
- Clear Next.js cache: `rm -rf .next`

### Import script fails
- Make sure Strapi is running
- Check that content types are created
- Verify API permissions (Settings → Users & Permissions → Public → find/findOne enabled)
