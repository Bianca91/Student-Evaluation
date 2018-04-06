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
import Evaluation from "./entity";
import Student from "../students/entity"

@JsonController()
export default class EvaluationController {
  @Get("/evaluation/:id")
  getEvaluation(@Param("id") id: number) {
    return Evaluation.findOneById(id);
  }

  @Authorized()
  @Get("/evaluation")
  allEvaluation() {
    return Evaluation.find();
  }

  @Authorized()
  @Put("/evaluation/:id")
  async updateEvaluation(
    @Param("id") id: number,
    @Body() update: Partial<Evaluation>
  ) {
    const evaluation = await Evaluation.findOneById(id);
    if (!evaluation) throw new NotFoundError("Cannot find evaluation");

    return Evaluation.merge(evaluation, update).save();
  }

  @Authorized()
  @Post("/colors")
  @HttpCode(201)
  async create(@Body() evaluation: Evaluation) {
    const entityEvaluation = await Evaluation.create(evaluation).save();

    for (let i = 0; i < evaluation.student.length; i++) {
      const entityStudent = await Student.create({
        firstName: entityEvaluation[i].firstName,
        lastName: entityEvaluation[i].lastName,
        evaluation: entityEvaluation[i]
      }).save();
    }
    return entityEvaluation;
  }

  @Authorized()
  @Delete("/evaluation/:id")
  async removeEvaluation(@Param("id") id: number) {
    const evaluation = await Evaluation.findOneById(id);
    if (!evaluation) throw new NotFoundError("Cannot find user");
    evaluation.remove();
    return "Evaluation succesfully deleted";
  }
}
