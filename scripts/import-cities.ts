/**
 * Import script for city data into Strapi CMS
 * Uses the admin content-manager API for authentication
 *
 * Usage:
 * 1. Make sure Strapi is running: cd studs-life-cms && npm run develop
 * 2. Run this script: npx tsx scripts/import-cities.ts
 */

import axios, { AxiosInstance } from 'axios';
import { citiesData } from './data/cities-data';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

let adminClient: AxiosInstance;

// Login as admin and create authenticated client
async function loginAdmin(): Promise<void> {
    const email = process.env.STRAPI_ADMIN_EMAIL || 'admin@studs-life.com';
    const password = process.env.STRAPI_ADMIN_PASSWORD || 'Admin123!';

    const { data } = await axios.post(`${STRAPI_URL}/admin/login`, { email, password });
    const token = data.data.token;

    adminClient = axios.create({
        baseURL: STRAPI_URL,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        timeout: 10000,
    });

    console.log('✓ Authenticated as admin\n');
}

// Helper to create or find country via content-manager
async function createOrFindCountry(countryName: string, countrySlug: string, locale: string = 'ru') {
    try {
        // Search for existing country via content-manager
        const { data: result } = await adminClient.get(
            `/admin/content-manager/collection-types/api::country.country`,
            { params: { locale, 'filters[slug][$eq]': countrySlug } }
        );

        if (result.results && result.results.length > 0) {
            console.log(`✓ Country "${countryName}" already exists (id: ${result.results[0].id})`);
            return result.results[0].documentId;
        }

        // Create new country
        const { data: newCountry } = await adminClient.post(
            `/admin/content-manager/collection-types/api::country.country`,
            {
                name: countryName,
                slug: countrySlug,
                featured: true,
                locale,
            }
        );

        // Publish it
        try {
            await adminClient.post(
                `/admin/content-manager/collection-types/api::country.country/${newCountry.data?.documentId || newCountry.documentId}/actions/publish`,
                { locale }
            );
        } catch {
            // May already be published or auto-publish
        }

        const docId = newCountry.data?.documentId || newCountry.documentId;
        console.log(`✓ Created country: ${countryName} (documentId: ${docId})`);
        return docId;
    } catch (error: any) {
        console.error(`✗ Error with country ${countryName}:`, error.response?.data?.error?.message || error.message);
        throw error;
    }
}

// Helper to create city via content-manager
async function createCity(cityData: any, countryDocumentId: string, locale: string = 'ru') {
    try {
        // Check if city exists
        const { data: result } = await adminClient.get(
            `/admin/content-manager/collection-types/api::city.city`,
            { params: { locale, 'filters[slug][$eq]': cityData.slug } }
        );

        if (result.results && result.results.length > 0) {
            console.log(`  ⊙ City "${cityData.name}" already exists, skipping...`);
            return;
        }

        // Create new city
        const { data: newCity } = await adminClient.post(
            `/admin/content-manager/collection-types/api::city.city`,
            {
                name: cityData.name,
                slug: cityData.slug,
                title: cityData.title,
                intro: cityData.intro,
                economyContent: cityData.economyContent,
                housingContent: cityData.housingContent,
                transportContent: cityData.transportContent,
                climateContent: cityData.climateContent,
                climateTable: cityData.climateTable,
                conclusion: cityData.conclusion,
                featured: cityData.featured || false,
                metaDescription: cityData.metaDescription,
                country: countryDocumentId,
                locale,
            }
        );

        // Publish it
        try {
            const docId = newCity.data?.documentId || newCity.documentId;
            await adminClient.post(
                `/admin/content-manager/collection-types/api::city.city/${docId}/actions/publish`,
                { locale }
            );
        } catch {
            // May already be published or auto-publish
        }

        console.log(`  ✓ Created city: ${cityData.name}`);
    } catch (error: any) {
        console.error(`  ✗ Error creating city ${cityData.name}:`, error.response?.data?.error?.message || error.message);
    }
}

// Main import function
async function importCities() {
    console.log('🚀 Starting city data import...\n');

    try {
        await axios.get(`${STRAPI_URL}/_health`);
        console.log('✓ Connected to Strapi');
    } catch (error) {
        console.error('✗ Cannot connect to Strapi. Make sure it\'s running on', STRAPI_URL);
        process.exit(1);
    }

    await loginAdmin();

    let totalCountries = 0;
    let totalCities = 0;

    for (const countryData of citiesData) {
        console.log(`\n📍 Processing country: ${countryData.name}`);

        const countryDocumentId = await createOrFindCountry(
            countryData.name,
            countryData.slug,
            'ru'
        );

        totalCountries++;

        for (const city of countryData.cities) {
            await createCity(city, countryDocumentId, 'ru');
            totalCities++;
        }
    }

    console.log('\n✅ Import completed!');
    console.log(`   Countries: ${totalCountries}`);
    console.log(`   Cities: ${totalCities}`);
}

// Run import
importCities().catch((error) => {
    console.error('Import failed:', error.message || error);
    process.exit(1);
});
