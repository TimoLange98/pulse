import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from 'src/constants';
import { ProjectType } from 'src/types/ProjectType';

@Injectable()
export class ProjectService {
  constructor(@Inject(PG_CONNECTION) private pool: Pool) {}

  async getProjects(userId: string) {
    const client = await this.pool.connect();

    try {
      const result = await client.query<ProjectType>('select * from projects where userId = $1', [userId]);
      return result.rows;
    } catch (err) {
      console.error(`Failed loading projects for user ${userId}`, err);
    } finally {
      client.release();
    }
  }
}
