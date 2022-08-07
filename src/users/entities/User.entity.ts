import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'unique id of the user' })
  id: number;

  @Column({ unique: true })
  @Field({ description: 'email of the user' })
  email: string;

  @Column()
  password: string;
}
