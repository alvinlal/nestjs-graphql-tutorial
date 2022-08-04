import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/User.entity';
import { UsersService } from './users.service';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RepoMockType } from '../../test/types';

describe('UserService', () => {
  let usersService: UsersService;
  const usersRepositoryMock: RepoMockType<Repository<User>> = {
    save: jest.fn(),
    create: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepositoryMock,
        },
      ],
    }).compile();
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new user', async () => {
      const createUserInput: CreateUserInput = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const mockReturnValue = {
        id: faker.datatype.uuid(),
        ...createUserInput,
      };
      usersRepositoryMock.save.mockReturnValue(mockReturnValue);
      const newUser = await usersService.create(createUserInput);
      expect(newUser).toMatchObject({
        id: expect.any(String),
        email: createUserInput.email,
      });
      expect(usersRepositoryMock.create).toHaveBeenCalledTimes(1);
      expect(usersRepositoryMock.create).toHaveBeenCalledWith(createUserInput);
      expect(usersRepositoryMock.save).toHaveBeenCalledTimes(1);
    });
  });
});
