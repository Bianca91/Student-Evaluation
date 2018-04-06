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
  Authorized
} from "routing-controllers";
import Student from "./entity";
import Color from "../colors/entity";

const studentColors = ["Red", "Yellow", "Green"];
const colorWeight = [2, 3, 1, 4];
const totalWeight = eval(colorWeight.join("+"));
const weighedColors = new Array();
let currentColor = 0;

@JsonController()
export default class StudentController {
  @Get("/students/:id")
  getStudent(@Param("id") id: number) {
    return Student.findOneById(id);
  }

  @Authorized()
  @Get("/students")
  allStudents() {
    return Student.find();
  }

  @Authorized()
  @Put("/students/:id")
  async updateStudentInfo(
    @Param("id") id: number,
    @Body() update: Partial<Student>
  ) {
    const student = await Student.findOneById(id);
    if (!student) throw new NotFoundError("Cannot find page");

    return Student.merge(student, update).save();
  }

  @Authorized()
  @Post("/students")
  @HttpCode(201)
  async createStudent(@Body() student: Student) {
    return student.save();
  }

  @Authorized()
  @Delete("/students/:id")
  async removeStudent(@Param("id") id: number) {
    const student = await Student.findOneById(id);
    if (!student) throw new NotFoundError("Cannot find user");
    student.remove();
    return "Student succesfully deleted";
  }

  @Post("/randomStudent/:id")
  async getRandomStudent(@Body() randomStudent: Student) {
    const nextStudent = () => {
      while (currentColor < studentColors.length) {
        for (let i = 0; i < colorWeight[currentColor]; i++)
          weighedColors[weighedColors.length] = studentColors[currentColor];
        currentColor++;
      }

      const randomStudent = Math.floor(Math.random() * totalWeight);
      console.log(weighedColors[randomStudent]);
      return weighedColors[randomStudent];
    };
    return randomStudent.save();
  }
}
