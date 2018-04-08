import {
  JsonController,
  Post,
  HttpCode,
  Body,
  Authorized,
  Get,
  Param,
  Put,
  NotFoundError,
  BadRequestError
} from "routing-controllers";
import Classes from "./entity";
import Student from "../students/entity";
import * as request from "superagent";
import User from "../login/userController";

const baseUrl = "http://localhost:4000";

@JsonController()
export default class ClassController {
  //  @Authorized()
  @Get("/classess")
  allClassess() {
    return Classes.find();
  }

  @Get("/classess/:id")
  getClasses(@Param("id") id: number) {
    return Classes.findOneById(id);
  }

  //  @Authorized()
  @Put("/classess/:id")
  async updateClasses(
    @Param("id") id: number,
    @Body() update: Partial<Classes>
  ) {
    const classes = await Classes.findOneById(id);
    if (!classes) throw new NotFoundError("Cannot find page");

    return Classes.merge(classes, update).save();
  }

  @Post("/classes")
  @HttpCode(201)
  async createClass(@Body() classes: Classes) {
    const entityClass = await Classes.create(classes).save();

    await Student.create({
      classes: entityClass
    }).save();

    const classId = await Classes.findOneById(entityClass.id);

    return classId;
  }

  @Post("/classes/:id([0-9]+)/students")
  @HttpCode(201)
  async createStudent(@Param("id") classesId: number) {
    const classes = await Classes.findOneById(classesId);
    if (!classes) throw new BadRequestError(`Class does not exist`);

    await classes.save();

    const student = await Student.create({
      classes
    }).save();

    return student;
  }
}
// for (let j = 0; j < quiz.question[i].answer.length; j++) {
//   await Answer.create({
//     question: entityQuestion,
//     text: quiz.question[i].answer[j].text,
//     correct: quiz.question[i].answer[j].correct
//   }).save();
// }
