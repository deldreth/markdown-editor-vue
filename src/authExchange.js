import { Auth } from 'aws-amplify';
import { makeOperation } from '@urql/vue';

export const getAuth = async ({ authState }) => {
  if (!authState) {
    try {
      const { accessToken, refreshToken } = await Auth.currentSession();
      if (accessToken && refreshToken) {
        return {
          token: accessToken.jwtToken,
          refreshToken: refreshToken.token,
        };
      }
    } catch (e) {
      return null;
    }

    return null;
  }

  await Auth.signOut();

  return null;
};

export const addAuthToOperation = ({ authState, operation }) => {
  if (!authState || !authState.token) {
    return operation;
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === 'function'
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        Authorization: authState.token,
      },
    },
  });
};
