/**
 * Automated Parser for City Content
 * 
 * This script reads the cities-content.txt file and converts it to cities-data.ts format
 * 
 * Usage:
 * 1. Save your city content to: C:\Users\vnrnesia\Desktop\cities-content.txt
 * 2. Run: npx tsx scripts/parse-cities.ts
 */

import * as fs from 'fs';
import * as path from 'path';

interface Season {
    name: string;
    temperature: string;
    features: string;
}

interface City {
    name: string;
    slug: string;
    title: string;
    intro: string;
    economyContent: string;
    housingContent: string;
    transportContent: string;
    climateContent: string;
    climateTable: { seasons: Season[] } | null;
    conclusion: string;
    featured: boolean;
    metaDescription: string;
}

interface Country {
    name: string;
    slug: string;
    cities: City[];
}

// Helper: Convert text to slug
function slugify(text: string): string {
    const cyrillicToLatin: { [key: string]: string } = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
        'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
        'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
        'і': 'i', 'ї': 'yi', 'є': 'ye'
    };

    return text
        .toLowerCase()
        .split('')
        .map(char => cyrillicToLatin[char] || char)
        .join('')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// English slug overrides for countries and cities
const slugOverrides: { [key: string]: string } = {
    // Countries
    'россия': 'russia',
    'кипр': 'cyprus',
    'китай': 'china',
    'турция': 'turkey',
    'беларусь': 'belarus',
    'болгария': 'bulgaria',
    // Russian cities
    'москва': 'moscow',
    'санкт-петербург': 'saint-petersburg',
    'казань': 'kazan',
    'уфа': 'ufa',
    'иркутск': 'irkutsk',
    'саранск': 'saransk',
    'архангельск': 'arkhangelsk',
    'калининград': 'kaliningrad',
    'севастополь': 'sevastopol',
    'иннополис': 'innopolis',
    'новосибирск': 'novosibirsk',
    'орёл': 'orel',
    'тула': 'tula',
    // Cyprus cities
    'никосия': 'nicosia',
    // Chinese cities
    'пекин': 'beijing',
    'шанхай': 'shanghai',
    'тяньцзинь': 'tianjin',
    'сиань': 'xian',
    'гуанчжоу': 'guangzhou',
    'урумчи': 'urumqi',
    'харбин': 'harbin',
    // Turkish cities
    'стамбул': 'istanbul',
    'анкара': 'ankara',
    'бурса': 'bursa',
    'измир': 'izmir',
    'конья': 'konya',
    'маниса': 'manisa',
    // Belarus cities
    'минск': 'minsk',
    'гомель': 'gomel',
    'витебск': 'vitebsk',
    'гродно': 'grodno',
    // Bulgaria cities
    'варна': 'varna',
};

function getSlug(name: string): string {
    const lower = name.toLowerCase().trim();
    return slugOverrides[lower] || slugify(name);
}


// Helper: Convert text to HTML
function textToHtml(text: string): string {
    if (!text) return '';

    // Split by paragraphs
    const paragraphs = text.split('\n').filter(p => p.trim());

    let html = '';
    let inList = false;

    for (let para of paragraphs) {
        para = para.trim();

        // Skip empty lines
        if (!para) continue;

        // Headers (lines ending with :)
        if (para.match(/^[А-ЯЁ].+:$/)) {
            if (inList) {
                html += '</ul>\n';
                inList = false;
            }
            html += `<h3>${para.replace(/:$/, '')}</h3>\n`;
            continue;
        }

        // List items (starting with numbers or bullets)
        if (para.match(/^[0-9]+\.|^•|^-/)) {
            if (!inList) {
                html += '<ul>\n';
                inList = true;
            }
            const content = para.replace(/^[0-9]+\.\s*|^[•-]\s*/, '');
            html += `<li>${content}</li>\n`;
            continue;
        }

        // Emoji headers
        if (para.match(/^[🔹💡❄️☀️🌧️🍂🌸]/)) {
            if (inList) {
                html += '</ul>\n';
                inList = false;
            }
            html += `<h3>${para}</h3>\n`;
            continue;
        }

        // Blockquotes (starting with 💡)
        if (para.includes('💡 Совет:') || para.includes('💡 Вывод:')) {
            if (inList) {
                html += '</ul>\n';
                inList = false;
            }
            html += `<blockquote><p>${para}</p></blockquote>\n`;
            continue;
        }

        // Regular paragraphs
        if (inList) {
            html += '</ul>\n';
            inList = false;
        }
        html += `<p>${para}</p>\n`;
    }

    if (inList) {
        html += '</ul>\n';
    }

    return html.trim();
}

// Helper: Check if a line is a city title
// City titles look like "Москва — столица возможностей для студентов"
// The part before — should be short (city name), and the whole line should be a short title
function isCityTitle(line: string): boolean {
    if (!line.includes(' — ')) return false;

    const dashIdx = line.indexOf(' — ');
    const beforeDash = line.substring(0, dashIdx).trim();
    const afterDash = line.substring(dashIdx + 3).trim();

    // City names are short (max ~40 chars, max ~4 words)
    if (beforeDash.length > 40) return false;
    const wordCount = beforeDash.split(/\s+/).length;
    if (wordCount > 5) return false;

    // The subtitle/slogan after — should also be relatively short (not a full sentence)
    if (afterDash.length > 80) return false;

    // Total line should be short enough to be a title, not a paragraph
    if (line.length > 100) return false;

    // Must start with uppercase Cyrillic letter (city name)
    if (!/^[А-ЯЁA-Z]/.test(beforeDash)) return false;

    // Should NOT start with emoji, number, or bullet
    if (/^[0-9💰🏠🚇🚍🌦🌤🎯✨🔹💡❄☀🌧🍂🌸•\-]/.test(beforeDash)) return false;

    // Should NOT be common content words that appear with —
    const lowerBefore = beforeDash.toLowerCase();
    const contentWords = ['стоимость', 'преимущества', 'расходы', 'цена', 'средние', 'аренда', 'питание', 'транспорт', 'общежити', 'климат', 'итог', 'это', 'как', 'он', 'она', 'они', 'здесь', 'благодаря', 'компания', 'однако'];
    if (contentWords.some(w => lowerBefore.startsWith(w))) return false;

    // The afterDash should not end with period (titles usually don't)
    if (afterDash.endsWith('.')) return false;

    return true;
}

// Main parser function
function parseContent(content: string): Country[] {
    const countries: Country[] = [];

    // Split by country headers
    // Match lines that are ONLY a country name (uppercase Cyrillic, or title case like "Россия")
    const lines = content.split('\n');
    const countryStartIndices: number[] = [];

    // Known country names for better detection
    const knownCountries = ['россия', 'кипр', 'китай', 'турция', 'беларусь', 'болгария'];

    for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim();
        if (!trimmed) continue;

        // Check if this line is a standalone country name
        if (knownCountries.includes(trimmed.toLowerCase())) {
            countryStartIndices.push(i);
        }
    }

    // If no known countries found, fall back to uppercase detection
    if (countryStartIndices.length === 0) {
        for (let i = 0; i < lines.length; i++) {
            const trimmed = lines[i].trim();
            if (/^[А-ЯЁ]{3,}$/.test(trimmed)) {
                countryStartIndices.push(i);
            }
        }
    }

    // Process each country block
    for (let ci = 0; ci < countryStartIndices.length; ci++) {
        const startIdx = countryStartIndices[ci];
        const endIdx = ci + 1 < countryStartIndices.length ? countryStartIndices[ci + 1] : lines.length;

        const countryName = lines[startIdx].trim();
        const country: Country = {
            name: countryName,
            slug: getSlug(countryName),
            cities: []
        };

        let currentCity: Partial<City> | null = null;
        let currentSection = '';
        let sectionContent = '';

        for (let i = startIdx + 1; i < endIdx; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            // City title detection (uses the improved helper)
            if (isCityTitle(line)) {
                // Save previous city
                if (currentCity && currentCity.name) {
                    if (sectionContent) {
                        (currentCity as any)[currentSection] = textToHtml(sectionContent);
                    }
                    country.cities.push(currentCity as City);
                }

                // Start new city
                const dashIdx = line.indexOf(' — ');
                const cityName = line.substring(0, dashIdx).trim();
                const subtitle = line.substring(dashIdx + 3).trim();
                currentCity = {
                    name: cityName,
                    slug: getSlug(cityName),
                    title: line,
                    intro: '',
                    economyContent: '',
                    housingContent: '',
                    transportContent: '',
                    climateContent: '',
                    climateTable: null,
                    conclusion: '',
                    featured: false,
                    metaDescription: subtitle?.substring(0, 160) || ''
                };
                currentSection = 'intro';
                sectionContent = '';
                continue;
            }

            // Section headers
            if (line.includes('💰 Экономика') || line.startsWith('💰')) {
                if (sectionContent && currentCity) {
                    (currentCity as any)[currentSection] = textToHtml(sectionContent);
                }
                currentSection = 'economyContent';
                sectionContent = '';
                continue;
            }

            if (line.includes('🏠 Варианты проживания') || line.includes('🏠 Проживание') || line.startsWith('🏠')) {
                if (sectionContent && currentCity) {
                    (currentCity as any)[currentSection] = textToHtml(sectionContent);
                }
                currentSection = 'housingContent';
                sectionContent = '';
                continue;
            }

            if (line.startsWith('🚇') || line.startsWith('🚍')) {
                if (sectionContent && currentCity) {
                    (currentCity as any)[currentSection] = textToHtml(sectionContent);
                }
                currentSection = 'transportContent';
                sectionContent = '';
                continue;
            }

            if (line.startsWith('🌦️') || line.startsWith('🌤️') || line.startsWith('🌦')) {
                if (sectionContent && currentCity) {
                    (currentCity as any)[currentSection] = textToHtml(sectionContent);
                }
                currentSection = 'climateContent';
                sectionContent = '';
                continue;
            }

            if (line.includes('🎯 Итог') || line.includes('✨ Итог') || line.startsWith('🎯') || line.startsWith('✨')) {
                if (sectionContent && currentCity) {
                    (currentCity as any)[currentSection] = textToHtml(sectionContent);
                }
                currentSection = 'conclusion';
                sectionContent = '';
                continue;
            }

            // Accumulate content
            sectionContent += line + '\n';
        }

        // Save last city
        if (currentCity && currentCity.name) {
            if (sectionContent) {
                (currentCity as any)[currentSection] = textToHtml(sectionContent);
            }
            country.cities.push(currentCity as City);
        }

        if (country.cities.length > 0) {
            countries.push(country);
        }
    }

    return countries;
}

// Main execution
async function main() {
    const inputPath = path.join(__dirname, 'data', 'cities-content.txt');
    const outputPath = path.join(__dirname, 'data', 'cities-data.ts');

    console.log('🔍 Reading input file:', inputPath);

    if (!fs.existsSync(inputPath)) {
        console.error('❌ File not found:', inputPath);
        console.log('\n📝 Please create the file with your city content.');
        process.exit(1);
    }

    const content = fs.readFileSync(inputPath, 'utf-8');
    console.log('✅ File loaded, parsing...');

    const countries = parseContent(content);
    console.log(`\n✅ Parsed ${countries.length} countries`);

    countries.forEach(country => {
        console.log(`   📍 ${country.name}: ${country.cities.length} cities`);
    });

    // Generate TypeScript file
    let output = `/**
 * Auto-generated city data from cities-content.txt
 * Generated on: ${new Date().toISOString()}
 */

export const citiesData = ${JSON.stringify(countries, null, 2)};
`;

    fs.writeFileSync(outputPath, output, 'utf-8');
    console.log('\n✅ Output written to:', outputPath);
    console.log('\n🎉 Done! You can now run: npx tsx scripts/import-cities.ts');
}

main().catch(console.error);
