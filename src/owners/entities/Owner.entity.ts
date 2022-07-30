import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pet } from '../../pets/entities/Pet.entity';

@Entity()
@ObjectType()
export class Owner {
  /**
   * unique id of an owner
   */
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  /**
   * name of the owner
   */
  @Column()
  @Field()
  name: string;

  /**
   * pets owned by the owner
   */
  @OneToMany(() => Pet, (pet) => pet.owner)
  @Field(() => [Pet])
  pets?: Pet[];
}
