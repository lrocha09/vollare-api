export const environment = {
    server: { port: process.env.SERVER_PORT || 3333 },
    db: { url: process.env.DB_URL || 'mongodb://localhost/vollare-api' },
    jwt: {
        secret: process.env.JWT_SECRET || 'aaca9be4aa64f905900a2d5460172df9',
        expiresIn: process.env.JWT_EXPIRESIN || '1d',
    },
};
