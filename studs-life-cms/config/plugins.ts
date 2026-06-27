export default ({ env }) => ({
    upload: {
        config: {
            provider: env('CLOUDINARY_KEY') ? 'cloudinary' : 'local',
            providerOptions: env('CLOUDINARY_KEY') ? {
                cloud_name: env('CLOUDINARY_NAME'),
                api_key: env('CLOUDINARY_KEY'),
                api_secret: env('CLOUDINARY_SECRET'),
            } : {},
            actionOptions: {
                upload: {},
                uploadStream: {},
                delete: {},
            },
        },
    },
});
