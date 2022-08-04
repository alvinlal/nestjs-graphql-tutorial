export type RepoMockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};
