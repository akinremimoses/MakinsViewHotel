import { HttpLink, InMemoryCache, ApolloClient } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NODE_ENV === 'production' 
      ? "/api/graphql" 
      : "http://localhost:3000/api/graphql",
    credentials: "include", 
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

export default client;