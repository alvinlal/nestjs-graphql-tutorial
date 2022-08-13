import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pet } from '../../pets/entities/Pet.entity';

@Entity()
@ObjectType({
  description: 'entity representing an owner',
})
export class Owner {
  /**
   * unique id of an owner
   */
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'unique id of the owner' })
  id: number;

  /**
   * name of the owner
   */
  @Column()
  @Field({ description: 'name of the owner' })
  name: string;

  /**
   * pets owned by the owner
   */
  @OneToMany(() => Pet, (pet) => pet.owner)
  @Field(() => [Pet], { description: 'list of pets owned by the owner' })
  pets?: Pet[];
}
