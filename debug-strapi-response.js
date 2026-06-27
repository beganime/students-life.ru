const fetch = require('node-fetch');

async function debugStrapi() {
    try {
        const url = 'http://localhost:1337/api/cities?populate=images,country&sort=publishedAt:desc&pagination[limit]=3';
        console.log('Fetching:', url);
        const res = await fetch(url);
        const json = await res.json();
        console.log(JSON.stringify(json, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
}

debugStrapi();
