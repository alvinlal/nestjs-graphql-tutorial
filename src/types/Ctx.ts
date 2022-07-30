import { GraphQLExecutionContext } from '@nestjs/graphql';
import { User } from '../users/entities/User.entity';
import { Request, Response } from 'express';

export interface Ctx extends GraphQLExecutionContext {
  user: User;
  req: Request;
  res: Response;
}
