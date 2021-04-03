import * as faker from 'faker';

export const createRandomUser = () => {
  const email = faker.internet.email();
  const password = faker.internet.password();

  return { email, password };
};

export const createIdea = () => {
  const title = faker.lorem.sentence();
  const body = faker.lorem.paragraph();

  return { title, body };
};
