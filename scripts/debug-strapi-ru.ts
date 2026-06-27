import { getCities, getCountries } from '../src/lib/strapi';

async function main() {
    console.log('--- Debugging Strapi Data for RU Locale ---');

    try {
        console.log('Fetching Countries (en)...');
        const countriesEn = await getCountries('en');
        console.log('EN Countries:', countriesEn.map(c => `${c.name} (${c.slug})`).join(', '));

        console.log('\nFetching Countries (ru)...');
        const countriesRu = await getCountries('ru');
        console.log('RU Countries:', countriesRu.map(c => `${c.name} (${c.slug})`).join(', '));

        console.log('\nFetching Cities (en)...');
        const citiesEn = await getCities(undefined, 'en');
        console.log('EN Cities:', citiesEn.map(c => `${c.name} (${c.slug}) [Country: ${c.country?.slug}]`).join(', '));

        console.log('\nFetching Cities (ru)...');
        const citiesRu = await getCities(undefined, 'ru');
        console.log('RU Cities:', citiesRu.map(c => `${c.name} (${c.slug}) [Country: ${c.country?.slug}]`).join(', '));

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

main();
