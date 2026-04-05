

export const envConfig = () => ({
    environment: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3000,
    mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nest-pokemon',
    defaultLimit: +process.env.DEFAULT_LIMIT! || 7
})