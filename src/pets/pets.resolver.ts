import { Inject } from '@nestjs/common';
import {
  Args,
  Info,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from '../pubsub/pubsub.constants';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './entities/Pet.entity';
import { PET_ADDED } from './pets.constants';
import { PetsService } from './pets.service';

@Resolver(() => Pet)
export class PetsResolver {
  constructor(
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
    private readonly petsService: PetsService,
  ) {}

  @Mutation(() => Pet)
  async createPet(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<Pet> {
    const newPet = await this.petsService.createPet(createPetInput);
    this.pubSub.publish(PET_ADDED, { petAdded: newPet });
    return newPet;
  }

  @Query(() => [Pet], { name: 'pets', nullable: true })
  findAll(@Info() info): Promise<Pet[]> {
    return this.petsService.findAll(info);
  }

  @Query(() => Pet, { name: 'pet', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petsService.findOne(id);
  }

  @Subscription(() => Pet)
  petAdded() {
    return this.pubSub.asyncIterator(PET_ADDED);
  }
}