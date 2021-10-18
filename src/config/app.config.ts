// for projects bigger than a middle
// see usage in coffee.service.ts

export default () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DB_HOST, // without docker 'localhost'
    port: parseInt(process.env.DB_PORT, 10) || 5432,
  },
});
