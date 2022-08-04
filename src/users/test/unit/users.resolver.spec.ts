import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserInput } from '../../dto/create-user.input';
import { UsersResolver } from '../../users.resolver';
import { UsersService } from '../../users.service';

describe('UsersResolver', () => {
  let usersResolver: UsersResolver;
  const mockUsersService = {
    create: jest.fn((createUserInput: CreateUserInput) => ({
      id: faker.datatype.uuid(),
      ...createUserInput,
    })),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();
    usersResolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(usersResolver).toBeDefined();
  });

  describe('createUser()', () => {
    it('should create an user', async () => {
      const createUserInput: CreateUserInput = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      const user = await usersResolver.createUser(createUserInput);
      expect(user).toMatchObject({
        id: expect.any(String),
        email: createUserInput.email,
      });
      expect(mockUsersService.create).toHaveBeenCalledWith(createUserInput);
      expect(mockUsersService.create).toHaveBeenCalledTimes(1);
    });
  });
});
