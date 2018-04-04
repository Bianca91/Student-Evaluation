import 'reflect-metadata'
import {createKoaServer } from "routing-controllers"
import setupDb from './db'
import ClassController from './class/controller'
import StudentController from './students/controller'
import LoginController from './login/controller'
import {Action } from 'routing-controllers'
import { verify } from './jwt'
import UserController from './login/userController'

const port = process.env.PORT || 4000

const app = createKoaServer({
   controllers: [ClassController, StudentController, LoginController, UserController],

   authorizationChecker: (action: Action) => {
       const header: string = action.request.headers.authorization
       if (header && header.startsWith('Bearer ')) {
         const [ , token ] = header.split(' ')
         return !!(token && verify(token))
       }

       return false
     }

})

setupDb()
  .then(_ =>
    app.listen(4000, () => console.log(`Listening on port ${port}`))
  )
  .catch(err => console.error(err))
