import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guards/jwt.auth.guard";
import { ProjectService } from "src/project/project.service";
import { ProjectType } from "src/types/ProjectType";

@UseGuards(JwtAuthGuard)
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get('projects/:userId')
  async getProjects(@Param('userId') userId: string) {
    return await this.projectService.getProjects(userId);
  }

  @Post('create') 
  async createProject(@Body() payload: ProjectType) {
    return true;
  }
}