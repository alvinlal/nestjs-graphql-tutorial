import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from '../owners/entities/Owner.entity';
import { OwnersService } from '../owners/owners.service';
import { UtilsService } from '../utils/utils.service';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './entities/Pet.entity';

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

  findAll(info): Promise<Pet[]> {
    const shouldJoinOwner = this.utilsService.doesPathExist(info.fieldNodes, [
      'pets',
      'owner',
    ]);
    return this.petsRepository.find({
      relations: { ...(shouldJoinOwner && { owner: true }) },
    });
  }

  findOne(id: number): Promise<Pet> {
    return this.petsRepository.findOne({ where: { id } });
  }
}
