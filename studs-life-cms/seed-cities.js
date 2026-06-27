/**
 * Strapi v5 Seed Script — runs inside Strapi context
 * 
 * Usage (from studs-life-cms directory):
 *   node seed-cities.js
 * 
 * Or from project root:
 *   node studs-life-cms/seed-cities.js
 */

const { createStrapi } = require('@strapi/strapi');
const path = require('path');
const fs = require('fs');

// Load cities data
const citiesDataPath = path.resolve(__dirname, '..', 'scripts', 'data', 'cities-data.ts');
let citiesDataRaw = fs.readFileSync(citiesDataPath, 'utf-8');
// Strip TS export syntax to make it a valid JS expression
citiesDataRaw = citiesDataRaw
    .replace(/^\/\*\*[\s\S]*?\*\/\s*\n/m, '')
    .replace('export const citiesData =', 'module.exports =');
const tmpFile = path.join(__dirname, '.tmp', '_cities-data.js');
fs.mkdirSync(path.dirname(tmpFile), { recursive: true });
fs.writeFileSync(tmpFile, citiesDataRaw);
const citiesData = require(tmpFile);

async function seed() {
    console.log('🚀 Starting Strapi seed...\n');

    // Load Strapi without starting the server
    const appContext = await createStrapi({
        appDir: __dirname,
        distDir: path.join(__dirname, 'dist'),
    }).load();

    const strapi = appContext;

    console.log('✓ Strapi loaded\n');

    let totalCountries = 0;
    let totalCities = 0;

    for (const countryData of citiesData) {
        console.log(`\n📍 Processing country: ${countryData.name}`);

        // Check if country exists
        let country;
        try {
            const existing = await strapi.documents('api::country.country').findMany({
                filters: { slug: countryData.slug },
                locale: 'ru',
            });

            if (existing && existing.length > 0) {
                country = existing[0];
                console.log(`  ✓ Country "${countryData.name}" already exists (id: ${country.id})`);
            }
        } catch (e) {
            // Country type may not exist in this locale yet
        }

        if (!country) {
            try {
                country = await strapi.documents('api::country.country').create({
                    data: {
                        name: countryData.name,
                        slug: countryData.slug,
                        featured: true,
                    },
                    locale: 'ru',
                    status: 'published',
                });
                console.log(`  ✓ Created country: ${countryData.name}`);
            } catch (e) {
                console.error(`  ✗ Error creating country ${countryData.name}:`, e.message);
                continue;
            }
        }
        totalCountries++;

        // Create cities
        for (const cityData of countryData.cities) {
            try {
                // Check if city exists
                const existingCities = await strapi.documents('api::city.city').findMany({
                    filters: { slug: cityData.slug },
                    locale: 'ru',
                });

                if (existingCities && existingCities.length > 0) {
                    console.log(`  ⊙ City "${cityData.name}" already exists, skipping...`);
                    totalCities++;
                    continue;
                }

                await strapi.documents('api::city.city').create({
                    data: {
                        name: cityData.name,
                        slug: cityData.slug,
                        title: cityData.title,
                        intro: cityData.intro || '',
                        economyContent: cityData.economyContent || '',
                        housingContent: cityData.housingContent || '',
                        transportContent: cityData.transportContent || '',
                        climateContent: cityData.climateContent || '',
                        climateTable: cityData.climateTable || null,
                        conclusion: cityData.conclusion || '',
                        featured: cityData.featured || false,
                        metaDescription: cityData.metaDescription || '',
                        country: country.documentId,
                    },
                    locale: 'ru',
                    status: 'published',
                });
                console.log(`  ✓ Created city: ${cityData.name}`);
                totalCities++;
            } catch (e) {
                console.error(`  ✗ Error creating city ${cityData.name}:`, e.message);
            }
        }
    }

    console.log('\n✅ Import completed!');
    console.log(`   Countries: ${totalCountries}`);
    console.log(`   Cities: ${totalCities}`);

    // Clean up
    try { fs.unlinkSync(tmpFile); } catch { }

    await strapi.destroy();
    process.exit(0);
}

seed().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
});
