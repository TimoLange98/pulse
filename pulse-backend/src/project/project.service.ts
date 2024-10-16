import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { firstValueFrom, of } from 'rxjs';
import { PG_CONNECTION } from 'src/constants';
import { BasicResponse } from 'src/types/BasicResponse';
import { Project } from 'src/types/Project';

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
      const result = await client.query<Project>(SELECT_PROJECT, [projectId]);
      return result.rows[0];
    } catch(err) {
      console.error(`Failed to load project with id: ${projectId}`)
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
}

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
