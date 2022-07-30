import { Resolver, Query, Mutation, Args, Int, Info } from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { Owner } from './entities/Owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';

@Resolver(() => Owner)
export class OwnersResolver {
  constructor(private readonly ownersService: OwnersService) {}

  @Mutation(() => Owner)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput) {
    return this.ownersService.create(createOwnerInput);
  }

  @Query(() => [Owner], { name: 'owners', nullable: true })
  findAll(@Info() info) {
    return this.ownersService.findAll(info);
  }

  @Query(() => Owner, { name: 'owner', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ownersService.findOne(id);
  }
}
