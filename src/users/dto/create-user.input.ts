import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(6, 10)
  password: string;
}
