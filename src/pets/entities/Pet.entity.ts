import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Owner } from '../../owners/entities/Owner.entity';

@Entity()
@ObjectType()
export class Pet {
  /**
   * unique id of a pet
   */
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  /**
   * name of a pet
   */
  @Column()
  @Field()
  name: string;

  /**
   * type of the pet
   */
  @Column({ nullable: true })
  @Field({ nullable: true })
  type?: string;

  @Column()
  @Field(() => Int, { nullable: false })
  ownerId: number;

  /**
   * owner of the pet
   */
  @ManyToOne(() => Owner, (owner) => owner.pets)
  @Field(() => Owner)
  owner: Owner;
}
