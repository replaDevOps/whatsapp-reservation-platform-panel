import { from } from "@apollo/client";
import { ApolloClient, InMemoryCache, createHttpLink, HttpLink } from "@apollo/client";
import { setContext, SetContextLink } from "@apollo/client/link/context";
import { ErrorLink, onError } from "@apollo/client/link/error";

const API_URL = "https://220.152.66.148.host.secureserver.net/graphql";

// HTTP Link
const httpLink = createHttpLink({
  uri: API_URL,
  credentials: "include",
});

// Auth Link
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "", // 👈 space after Bearer
    },
  };
});

// Error Link for expired token
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      console.error("[GraphQL Error]:", err.message);
      if (
        err.message.includes("Token is invalid or expired") ||
        err.message.includes("Invalid token or authentication failed")
      ) {
        localStorage.clear();
        window.location.href = "/";
      }
    }
  }
});

// ✅ Apollo Client without subscriptions
export const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});
