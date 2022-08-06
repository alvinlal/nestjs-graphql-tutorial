import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetsService } from '../pets/pets.service';
import { UtilsService } from '../utils/utils.service';
import { CreateOwnerInput } from './dto/create-owner.input';
import { Owner } from './entities/Owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownersRepository: Repository<Owner>,
    @Inject(forwardRef(() => PetsService))
    private readonly petsService: PetsService,
    private readonly utilsService: UtilsService,
  ) {}

  create(createOwnerInput: CreateOwnerInput) {
    const newOwner = this.ownersRepository.create(createOwnerInput);
    return this.ownersRepository.save(newOwner);
  }

  findAll(info) {
    const shouldJoinPets = this.utilsService.doesPathExist(info.fieldNodes, [
      'owners',
      'pets',
    ]);
    return this.ownersRepository.find({
      relations: { ...(shouldJoinPets && { pets: true }) },
    });
  }

  findOne(id: number, info) {
    const shouldJoinPets = this.utilsService.doesPathExist(info.fieldNodes, [
      'owner',
      'pets',
    ]);
    return this.ownersRepository.findOne({
      where: { id },
      relations: { ...(shouldJoinPets && { pets: true }) },
    });
  }
}
