import { getCity } from '../src/lib/strapi';

async function main() {
    console.log('Checking Moscow (RU) relation...');
    try {
        const city = await getCity('russia', 'moscow', 'ru'); // countrySlug, citySlug, locale
        if (city) {
            console.log('City Found:', city.name);
            console.log('Linked Country:', city.country?.name, 'Slug:', city.country?.slug);
            if (!city.country) {
                console.error('FAIL: City exists but has NO country relation.');
            } else {
                console.log('SUCCESS: City is linked to country.');
            }
        } else {
            console.error('FAIL: City not found with slug "moscow" and country "russia" in locale "ru".');
        }
    } catch (e) { console.error(e); }
}
main();
