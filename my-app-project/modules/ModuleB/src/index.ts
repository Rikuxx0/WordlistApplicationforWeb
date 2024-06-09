import express from 'express'
import { createViteDevServer } from './viteServer'

const app = express()

app.listen(3000, () => {
  console.log('listening on port 3000')
})


createViteDevServer('../../ModuleA').then(({app}) => {
    app.use(app)
})