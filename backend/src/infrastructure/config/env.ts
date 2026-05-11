import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 7000,
  database_url: process.env.DATABASE_URL || '',
  frontend_url: process.env.FRONTEND_URL || "http://localhost:5173",
};
