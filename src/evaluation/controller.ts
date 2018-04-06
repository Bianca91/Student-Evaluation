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
  @Post("/evaluation")
  @HttpCode(201)
  async createEvaluation(@Body() evaluation: Evaluation) {
    return evaluation.save();
  }

  @Authorized()
  @Delete("/evaluation/:id")
  async removeStudent(@Param("id") id: number) {
    const evaluation = await Evaluation.findOneById(id);
    if (!evaluation) throw new NotFoundError("Cannot find user");
    evaluation.remove();
    return "Evaluation succesfully deleted";
  }
}
