/* eslint-disable no-console */
import app from './app';
import config from './app/config';
import colors from 'colors/safe';
import { Client } from 'pg';

async function main() {
  const client = new Client({
    connectionString: config.database_url, // postgresql://username:password@host:port/database
  });

  try {
    await client.connect();
    console.log(
      colors.bold(colors.green(`PostgreSQL connection is successful 🐘`))
    );

    app.listen(config.port, () => {
      console.log(
        colors.bold(colors.yellow(`App is listening on port ${config.port}`)),
      );
    });
  } catch (err) {
    console.error(colors.red('PostgreSQL connection failed ❌'), err);
    process.exit(1);
  }
}

main();
