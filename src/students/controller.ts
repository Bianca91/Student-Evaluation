import {
  JsonController,
  Put,
  Param,
  Body,
  NotFoundError,
  Post,
  HttpCode,
  Get,
  Delete,
  Authorized,
  BadRequestError
} from "routing-controllers";
import Student from "./entity";
import Evaluation from "../evaluation/entity";
import * as request from "superagent";

const baseUrl = "http://localhost:4000";

@JsonController()
export default class StudentController {
  @Get("/students/:id")
  getStudent(@Param("id") id: number) {
    return Student.findOneById(id);
  }

//  @Authorized()
  @Get("/students")
  allStudents() {
    return Student.find();
  }

//  @Authorized()
  @Put("/students/:id")
  async updateStudentInfo(
    @Param("id") id: number,
    @Body() update: Partial<Student>
  ) {
    const student = await Student.findOneById(id);
    if (!student) throw new NotFoundError("Cannot find page");

    return Student.merge(student, update).save();
  }
  @Post("/students")
    @HttpCode(201)
    async createStudent(@Body() students: Student) {
      const entityStudent = await Student.create(students).save();

      await Evaluation.create({
        student: entityStudent,
      }).save();

      const student = await Student.findOneById(entityStudent.id);

      return student;
    }

    @Authorized()
      @Post("/students/:id([0-9]+)/evaluation")
      @HttpCode(201)
      async createEvaluaton(@Param("id") studentId: number) {
        const student = await Student.findOneById(studentId);
        if (!student) throw new BadRequestError(`This student does not exist`);


        await student.save();

        const evaluation = await Evaluation.create({
          student,
        }).save();

        return evaluation;
      }
    //  @Authorized()
      @Delete("/students/:id")
      async removeStudent(@Param("id") id: number) {
        const student = await Student.findOneById(id);
        if (!student) throw new NotFoundError("Cannot find user");
        student.remove();
        return "Student succesfully deleted";
      }

}
  // @Post("/students")
  // @HttpCode(201)
  // async createStudent(@Body() student: Student) {
  //   const entityStudent = await Student.create(student).save();
  //
  //   for (let i = 0; i < student.evaluation.length; i++) {
  //     const entityEvaluation = await Evaluation.create({
  //       student: entityStudent,
  //       dailyEvaluation: student.evaluation[i].dailyEvaluation,
  //       remark: student.evaluation[i].remark,
  //       color: student.evaluation[i].color
  //     }).save();


      // for (let j = 0; j < quiz.question[i].answer.length; j++) {
      //   await Answer.create({
      //     question: entityQuestion,
      //     text: quiz.question[i].answer[j].text,
      //     correct: quiz.question[i].answer[j].correct
      //   }).save();
      // }

  //     const { hasId, save, remove, ...eventData } = entityStudent;
  //
  //     await request.post(baseUrl).send({
  //       event: "newStudent",
  //       data: eventData
  //     });
  //     return entityStudent;
  //   }
  // }
