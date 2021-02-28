import dotenv from 'dotenv'

const getConfigFile = (NODE_ENV) => {
  if (!NODE_ENV || NODE_ENV === 'production') {
    return '.env'
  }
  return `.env.${NODE_ENV}`
}

const CONFIG_FILE = `${process.cwd()}/${getConfigFile(process.env.NODE_ENV)}`
  .replace(/\.$/, '')

if (process.env.NODE_ENV !== 'test') {
  console.warn('Loading config file %s', CONFIG_FILE) //eslint-disable-line
}

dotenv.config({ path: CONFIG_FILE })
