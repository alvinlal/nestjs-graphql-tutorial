import { createUnionType } from '@nestjs/graphql';
import { Pet } from '../entities/Pet.entity';
import CreatePetError from '../mutationErrors/CreatePetError';

export const CreatePetResult = createUnionType({
  name: 'CreatePetResult',
  types: () => [Pet, CreatePetError] as const,
  resolveType(value) {
    if (value instanceof Pet) {
      return Pet;
    }
    return CreatePetError;
  },
});
