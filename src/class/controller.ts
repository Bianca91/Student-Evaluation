import {
  JsonController,
  Post,
  HttpCode,
  Body,
} from "routing-controllers";
import Classes from "./entity";

@JsonController()
export default class ClassController {
  @Post("/class")
  @HttpCode(201)
  async createBatch(@Body() classes: Classes) {
    return classes.save();
  }
}
