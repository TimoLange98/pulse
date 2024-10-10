import { Module, ValueProvider } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { Pool } from 'pg';

const dbProvider: ValueProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'pulse-dev',
    password: '12380',
    port: 5432
  })
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider]
})
export class DbModule {}
