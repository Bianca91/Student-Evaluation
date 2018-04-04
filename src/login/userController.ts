import { JsonController, Post, Body, Authorized, Get, Put, Patch, Delete, Param, NotFoundError } from 'routing-controllers'
import User from './entity';

@JsonController()
export default class UserController {

  @Post('/users')
  async setPassword(
    @Body() user: User
  ) {
    const {password, ...rest} = user
    const entity = User.create(rest)
    await entity.setPassword(password)
    return entity.save()
  }

  @Authorized()
  @Get('/users/:id([0-9]+)')
  getUser(
    @Param('id') id: number
  ) {
    return User.findOneById(id)
  }

  @Authorized()
  @Get('/users')
  allUsers() {
    return User.find()
  }

  @Authorized()
  @Put('/users/:id([0-9]+)')
  @Patch('/users/:id([0-9]+)')
  async updateUser(
    @Param('id') id: number,
    @Body() update: Partial<User>
  ) {
    const user = await User.findOneById(id)
    if (!user) throw new NotFoundError('Cannot find user')

    return User.merge(user, update).save()
  }

  @Authorized()
  @Delete('/users/:id([0-9]+)')
  async removeUser(
    @Param('id') id: number
  )  {
      const user = await User.findOneById(id)
      if (!user) throw new NotFoundError('Cannot find user')
      user.remove()
      return "user succesfully deleted"
    }

}
