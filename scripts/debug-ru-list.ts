import { getCities } from '../src/lib/strapi';

async function main() {
    console.log('Listing ALL RU Cities...');
    try {
        const cities = await getCities(undefined, 'ru');
        if (cities.length === 0) {
            console.log('No cities found in RU locale.');
        } else {
            cities.forEach(c => {
                console.log(`- Title: ${c.title}, Slug: "${c.slug}", Country: ${c.country ? c.country.slug : 'NULL'}`);
            });
        }
    } catch (e) { console.error(e); }
}
main();
