const dotenv = require('dotenv')

const getConfigFile = (NODE_ENV) => {
  if (!NODE_ENV) {
    return '.env'
  }
  return `.env.${NODE_ENV}`
}

const CONFIG_FILE = `${process.cwd()}/${getConfigFile(process.env.NODE_ENV)}`
  .replace(/\.$/, '')

if (process.env.NODE_ENV !== 'test') {
	console.log('Loading config file %s', CONFIG_FILE); //eslint-disable-line
}

dotenv.config({ path: CONFIG_FILE })

module.exports = {
   type: 'postgres',
   url: process.env.DATABASE_URL,
   synchronize: true,
   logging: false,
   entities: [
      'src/models/**/*.{ts,js}'
   ],
   migrations: [
      'src/migration/**/*.{ts,js}'
   ],
   subscribers: [
      'src/subscriber/**/*.{ts,js}'
   ],
   cli: {
      'entitiesDir': 'src/models',
      'migrationsDir': 'src/migration',
      'subscribersDir': 'src/subscriber'
   }
}
