import 'reflect-metadata'
import {createKoaServer } from "routing-controllers"
import setupDb from './db'
import ClassController from './class/controller'
import StudentController from './students/controller'
import LoginController from './login/controller'
import {Action } from 'routing-controllers'
import { verify } from './jwt'
import UserController from './login/userController'
import User from './login/entity'
import ColorsController from './colors/controller'

const port = process.env.PORT || 4000

const app = createKoaServer({
   cors: true,
   controllers: [ClassController, StudentController, LoginController, UserController, ColorsController],

   authorizationChecker: (action: Action) => {
       const header: string = action.request.headers.authorization
       if (header && header.startsWith('Bearer ')) {
         const [ , token ] = header.split(' ')
         return !!(token && verify(token))
       }

       return false
     },

     currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')

      if (token) {
        const id = verify(token)
        return User.findOneById(id)
      }
    }
    return undefined
  }

})

setupDb()
  .then(_ =>
    app.listen(port, () => console.log(`Listening on port ${port}`))
  )
  .catch(err => console.error(err))
