import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Owner } from '../../owners/entities/Owner.entity';

@Entity()
@ObjectType({
  description: 'entity representing a pet',
})
export class Pet {
  /**
   * unique id of a pet
   */
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'unique id of the pet' })
  id: number;

  /**
   * name of a pet
   */
  @Column()
  @Field({ description: 'name of the pet' })
  name: string;

  /**
   * type of the pet
   */
  @Column({ nullable: true })
  @Field({ nullable: true, description: 'type of the pet' })
  type?: string;

  @Column()
  @Field(() => Int, { nullable: false, description: 'id of the owner' })
  ownerId: number;

  /**
   * owner of the pet
   */
  @ManyToOne(() => Owner, (owner) => owner.pets)
  @Field(() => Owner, { description: 'owner of the pet' })
  owner: Owner;
}
