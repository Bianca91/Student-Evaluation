import {
  JsonController,
  Param,
  Get,
  HttpCode,
  Post,
  CurrentUser,
  BadRequestError,
  Body
} from "routing-controllers";
import Color from "./entity";
import Student from "../students/entity";

@JsonController()
export default class ColorsController {
  @Get("/colors/:id")
  getColor(@Param("id") id: number) {
    return Color.findOneById(id);
  }

  @Get("/colors")
  allColors() {
    return Color.find();
  }

  @Post("/colors")
  @HttpCode(201)
  async create(@Body() colors: Color) {
    const entityColor = await Color.create(colors).save();

    for (let i = 0; i < colors.colors.length; i++) {
      const entityStudent = await Student.create({
        firstName: entityColor[i].firstName,
        lastName: entityColor[i].lastName,
        //color: entityColor[i]
      }).save();
    }
    return entityColor;
  }
}
