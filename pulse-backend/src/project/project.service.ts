import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
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
      return result.rows;
    } catch (err) {
      console.error(`Failed loading projects for user ${userId}`, err);
    } finally {
      client.release();
    }
  }

  async createProject(title: string, description: string, deadline?: Date) {
    const client = await this.pool.connect();

    try {
      await client.query<any>('insert into project.projects (title, description, updated_by, deadline) values ($1, $2, $3, $4)', [
        title,
        description,
        'tl',
        deadline
      ]);
      return title;
    } catch (err) {
      console.error('Failed to create no project', err);
    } finally {
      client.release();
    }
  }
}

const SELECT_PROJECTS = `
  SELECT 
    p.*,  -- Select all fields from the projects table
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
