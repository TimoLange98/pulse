import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import {camelCase} from 'change-case-all'
import { map, Observable } from 'rxjs';

export class CamelCaseInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map(data => this.convertToCamelCase(data)));
  }

  private convertToCamelCase(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(item => this.convertToCamelCase(item));
    } else if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj).reduce((result, key) => {
        const newKey = camelCase(key); // Change to camel case
        result[newKey] = this.convertToCamelCase(obj[key]);
        return result;
      }, {} as any);
    }
    return obj;
  }
}
