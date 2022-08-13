import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnersService } from '../owners/owners.service';
import { UtilsService } from '../utils/utils.service';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './entities/Pet.entity';
import { validate } from 'class-validator';
import CreatePetError from './mutationErrors/CreatePetError';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private readonly petsRepository: Repository<Pet>,
    @Inject(forwardRef(() => OwnersService))
    private readonly ownersService: OwnersService,
    private readonly utilsService: UtilsService,
  ) {}

  async createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput);
    await this.petsRepository.save(newPet);
    return await this.petsRepository.findOne({
      where: {
        id: newPet.id,
      },
      relations: {
        owner: true,
      },
    });
  }

  async validateCreatePetInput(
    createPetInput: CreatePetInput,
  ): Promise<CreatePetError> {
    const input = new CreatePetInput();
    input.name = createPetInput.name;
    input.type = createPetInput.type;
    input.ownerId = createPetInput.ownerId;

    const validationErrors = await validate(input);
    const errors: CreatePetError = {};

    validationErrors.forEach((error) => {
      errors[`${error.property}Errors`] = Object.values(error.constraints);
    });

    return errors;
  }

  findAll(info): Promise<Pet[]> {
    const shouldJoinOwner = this.utilsService.doesPathExist(info.fieldNodes, [
      'pets',
      'owner',
    ]);
    return this.petsRepository.find({
      relations: { ...(shouldJoinOwner && { owner: true }) },
    });
  }

  findOne(id: number, info): Promise<Pet> {
    const shouldJoinOwner = this.utilsService.doesPathExist(info.fieldNodes, [
      'pet',
      'owner',
    ]);
    const shouldJoinOwnerPets = this.utilsService.doesPathExist(
      info.fieldNodes,
      ['pet', 'owner', 'pets'],
    );

    return this.petsRepository.findOne({
      where: { id },
      relations: [
        ...(shouldJoinOwner && ['owner']),
        ...(shouldJoinOwnerPets && ['owner.pets']),
      ],
    });
  }
}
