import * as faker from 'faker';

export const createRandomUser = () => {
  const random = Math.round( Math.random() * 100000 ).toString();
  const email = `test_${random}@example.com`;
  const password = `password_${random}`;

  return { email, password };
};

export const createIdea = () => {
  const title = faker.lorem.sentence();
  const body = faker.lorem.paragraph();

  return { title, body };
};
