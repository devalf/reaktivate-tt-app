/**
 * Based on the documentation, we can use a primitive option with only the user nickname declared.
 *
 * the API swagger doc is located here https://tdd.demo.reaktivate.com/api-docs/
 * so it might be not relevant in the future
 *
 * correctly, the API should return a user object with all the necessary basic information
 * where we can play with the user `id`
 */

export type ApiUserNickname = string;

export type ApiUser = {
  username: ApiUserNickname;
};
