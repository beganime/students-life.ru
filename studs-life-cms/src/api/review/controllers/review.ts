import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::review.review', ({ strapi }) => ({
    async create(ctx: any) {
        const { name, city, service, rating, content } = ctx.request.body?.data || {};

        const entry = await strapi.documents('api::review.review').create({
            data: { name, city, service, rating, content },
            status: 'draft',
        });

        return { data: entry };
    },
}));
