import {
  JsonController,
  Put,
  Param,
  Body,
  NotFoundError,
  Post,
  HttpCode,
  Get
} from "routing-controllers";
import Student from "./entity";

@JsonController()
export default class StudentController {
  @Get("/students/:id")
  getStudent(@Param("id") id: number) {
    return Student.findOneById(id);
  }

  @Get("/students")
  allStudents() {
    return Student.find();
  }

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
  createStudent(@Body() student: Student) {
    return student.save();
  }
}
