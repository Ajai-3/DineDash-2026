import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 7000,
  database_url: process.env.DATABASE_URL || '',
};
