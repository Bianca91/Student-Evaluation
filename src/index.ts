import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import setupDb from './db'
import ClassController from './class/controller'
import StudentController from './students/controller'

const port = process.env.PORT || 4000

const app = createKoaServer({
   controllers: [ClassController, StudentController]
})

setupDb()
  .then(_ =>
    app.listen(4000, () => console.log(`Listening on port ${port}`))
  )
  .catch(err => console.error(err))
