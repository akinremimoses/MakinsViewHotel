import { HttpLink, InMemoryCache, ApolloClient } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "/api/graphql",
    credentials: "include", // ✅ moved here so HttpLink carries cookies
  }),
  cache: new InMemoryCache(),
});

export default client;
