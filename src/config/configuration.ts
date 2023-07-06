export default () => ({
  database: {
    uri: process.env.DATABASE.replace(
      '<PASSWORD>',
      process.env.DATABASE_PASSWORD,
    ),
  },
});
