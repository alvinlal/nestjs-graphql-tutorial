import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { CreateUserInput } from '../../dto/create-user.input';

describe('UserResolver (e2e)', () => {
  let app: INestApplication;
  // let connection: DataSource;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    // connection = module.get<DataSource>(DataSource);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const graphqlEndpoint = '/graphql';

  describe('createUser()', () => {
    it('should create a new user', () => {
      const createUserInput: CreateUserInput = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      return request(app.getHttpServer())
        .post(graphqlEndpoint)
        .send({
          query: `mutation createUser($createUserInput: CreateUserInput!) {
            createUser(createUserInput: $createUserInput) {
              id
              email
            }
          }`,
          variables: {
            createUserInput,
          },
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createUser).toMatchObject({
            id: expect.any(Number),
            email: createUserInput.email,
          });
        });
    });
  });
});
