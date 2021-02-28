require('./src/config/dotenv')

const { JEST_TIMEOUT } = process.env
jest.setTimeout(JEST_TIMEOUT || 5000)
