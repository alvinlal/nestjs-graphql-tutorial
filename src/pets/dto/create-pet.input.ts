import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha, IsNumber } from 'class-validator';

@InputType()
export class CreatePetInput {
  @Field()
  @IsAlpha()
  name: string;

  @Field({ nullable: true })
  @IsAlpha()
  type?: string;

  @Field(() => Int)
  @IsNumber()
  ownerId: number;
}
