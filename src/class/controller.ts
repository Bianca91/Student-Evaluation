import {
  JsonController,
  Post,
  HttpCode,
  Body,
  Authorized,
  Get
} from "routing-controllers";
import Classes from "./entity";

@JsonController()
export default class ClassController {


//  @Authorized()
  @Get('/classess')
  allClassess() {
    return Classes.find()
  }

//  @Authorized()
  @Post("/classess")
  @HttpCode(201)
  async createBatch(@Body() classes: Classes) {
    return classes.save();
  }
}
