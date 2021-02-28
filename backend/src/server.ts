import app from './app'

const port = parseInt(process.env.APP_PORT as string) || 3000

import connection from './config/connnection'

connection.create().then(async () => {
  app.listen(port, () => {
    const logYellow = '\x1b[33m%s\x1b[0m';
    console.log(logYellow, `💾 running on ${port}`)
  })
}).catch(error => console.log(error));
