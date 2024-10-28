import { Inject, Injectable } from '@nestjs/common';
import { camelCase } from 'change-case-all';
import { Pool } from 'pg';
import { firstValueFrom, of } from 'rxjs';
import { PG_CONNECTION } from 'src/constants';
import { BasicResponse } from 'src/types/BasicResponse';
import { Project } from 'src/types/Project';
import { ProjectColumn } from 'src/types/ProjectColumn';
import { Task } from 'src/types/Task';

@Injectable()
export class ProjectService {
  constructor(@Inject(PG_CONNECTION) private pool: Pool) {}

  async getProjects(userId: string): Promise<Project[]> {
    const client = await this.pool.connect();

    try {
      const result = await client.query<Project>(SELECT_PROJECTS, [userId]);
      console.log(result);
      return result.rows;
    } catch (err) {
      console.error(`Failed loading projects for user ${userId}`, err);
    } finally {
      client.release();
    }
  }

  async getProject(projectId: string): Promise<Project> {
    const client = await this.pool.connect();

    try {
      const projectResult = await client.query<Project>(SELECT_PROJECT, [projectId]);
      const columnResult = await client.query<ProjectColumn>(SELECT_PROJECT_COLUMNS, [projectId]);
      const taskResult = await client.query<Task>(SELECT_TASKS, [projectId]);

      const columns: ProjectColumn[] = columnResult.rows.map(c => ({
        ...c,
        tasks: taskResult.rows
      }));

      return {
        ...projectResult.rows[0],
        columns
      } as Project;
    } catch (err) {
      console.error(`Failed to load project with id: ${projectId}`);
    } finally {
      client.release();
    }
  }

  async createProject(userId: string): Promise<{ id: string }> {
    const client = await this.pool.connect();

    try {
      const result = await client.query<any>(CREATE_PROJECT, [userId]);
      return result.rows[0];
    } catch (err) {
      console.error('Failed to create no project', err);
    } finally {
      client.release();
    }
  }

  async updateProject<K extends keyof Project>(projectId: string, prop: K, value: Project[K]) {
    if (!ALLOWED_PROPS_FOR_UPDATE.includes(prop)) throw new Error(`Property ${prop} is not allowed to be updated!`);

    const client = await this.pool.connect();

    const query = `update project.projects p set ${camelCase(prop)} = $1 where p.id = $2`;

    try {
      const result = await client.query<any>(query, [value, projectId]);
    } catch (err) {
      console.error('Failed to create no project', err);
    } finally {
      client.release();
    }
  }
}

const SELECT_TASKS = 'select * from project.tasks t where t.project_id = $1';

const SELECT_PROJECT_COLUMNS = 'select * from project."columns" c where c.project_id = $1';

const SELECT_PROJECT = `
  SELECT 
    p.*,
    COUNT(t.id) FILTER (WHERE t.completed = false) AS "tasksOpen",
    COUNT(t.id) FILTER (WHERE t.completed = true) AS "tasksCompleted"
  FROM 
    project.projects p
  LEFT JOIN 
    project.tasks t 
    ON p.id = t.project_id  -- Join tasks based on project_id
  WHERE 
    p.id = $1
  GROUP BY 
    p.id;
`;

const CREATE_PROJECT = `insert into project.projects (title, associated_user_ids, updated_by) values ('My new Project', ARRAY[$1]::UUID[], $1) returning id`;

const SELECT_PROJECTS = `
  SELECT 
    p.*,
    COUNT(t.id) FILTER (WHERE t.completed = false) AS "tasksOpen",
    COUNT(t.id) FILTER (WHERE t.completed = true) AS "tasksCompleted"
  FROM 
    project.projects p
  LEFT JOIN 
    project.tasks t 
    ON p.id = t.project_id  -- Join tasks based on project_id
  WHERE 
    $1 = ANY(p.associated_user_ids)
  GROUP BY 
    p.id;
`;

const ALLOWED_PROPS_FOR_UPDATE: Partial<keyof Project>[] = ['title', 'description'];
