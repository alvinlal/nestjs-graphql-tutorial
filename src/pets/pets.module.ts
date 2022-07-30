import { forwardRef, Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsResolver } from './pets.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/Pet.entity';
import { OwnersModule } from '../owners/owners.module';
import { PubsubModule } from '../pubsub/pubsub.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pet]),
    forwardRef(() => OwnersModule),
    PubsubModule,
  ],
  providers: [PetsService, PetsResolver],
  exports: [PetsService],
})
export class PetsModule {}
