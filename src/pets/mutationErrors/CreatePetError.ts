import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'field errors while creating a pet',
})
export default class CreatePetError {
  @Field(() => [String], { nullable: true })
  nameErrors?: [string];

  @Field(() => [String], { nullable: true })
  typeErrors?: [string];

  @Field(() => [String], { nullable: true })
  ownerIdErrors?: [string];
}
