import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import setupDb from './db'
import BatchController from './class/controller'

const port = process.env.PORT || 4000

const app = createKoaServer({
   controllers: [BatchController]
})

setupDb()
  .then(_ =>
    app.listen(4000, () => console.log(`Listening on port ${port}`))
  )
  .catch(err => console.error(err))
