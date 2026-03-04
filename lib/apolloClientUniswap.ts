import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3-base',
});

export const uniswapClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
