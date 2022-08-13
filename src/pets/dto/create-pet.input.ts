import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha, IsNumber, MaxLength } from 'class-validator';

@InputType({
  description: 'fields required to create a pet',
})
export class CreatePetInput {
  @Field()
  @IsAlpha()
  name: string;

  @Field({ nullable: true })
  @IsAlpha()
  @MaxLength(4)
  type?: string;

  @Field(() => Int)
  @IsNumber()
  ownerId: number;
}
