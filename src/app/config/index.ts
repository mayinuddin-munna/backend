import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.POSTGRESQL_URL,
  jwt_secret: process.env.JWT_SECRET,
  node_env: process.env.NODE_ENV,
  openai_api_key: process.env.OPENAI_API_KEY
};
