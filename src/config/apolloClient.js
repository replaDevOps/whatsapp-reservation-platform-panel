import { ApolloClient, InMemoryCache, createHttpLink, from, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from "@apollo/client/utilities";
import { getAccessToken, clearAuthTokens } from "../shared/tokenManager";
import { refreshAccessToken } from "../shared/tokenRefreshService";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const API_URL = "https://backend.qloop.me/graphql";
const WS_URL = "wss://backend.qloop.me/graphql";

let isRefreshing = false;
let pendingRequests = [];

// HTTP Link
const httpLink = createHttpLink({
  uri: API_URL,
  credentials: "include",
});

// Auth Link (Attaches token)
const authLink = setContext((_, { headers }) => {
//   const token = getAccessToken();
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxZWI1ZjAxNy05MjQ1LTQyNTgtOGM4Zi05NGY2MTNhNGRiMTUiLCJlbWFpbCI6InN1cGVyYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJmaXJzdE5hbWUiOiJEZWZhdWx0IiwibGFzdE5hbWUiOiJTdXBlckFkbWluIiwiaWF0IjoxNzYzOTA3NDAwLCJleHAiOjE3NjY0OTk0MDB9.7KOutW2mRbVHhdjNpxf7_8dA6aJ0uPdaZ_p1XNTZFO8'
const token = localStorage.getItem('accessToken')  
return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: WS_URL,
    connectionParams: () => {
      const token = localStorage.getItem('accessToken');
      return { authorization: token ? `Bearer ${token}` : "" };
    },
  })
);

// Split links: send subscriptions to wsLink, others to httpLink
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

// Error Handling Link with Token Refresh and Retry
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      console.error("[GraphQL Error]:", err.message);
      
      // Check if it's an authentication error
      if (
        err.message?.includes("Token is invalid or expired") ||
        err.message?.includes("Invalid token or authentication failed") ||
        err.message?.includes("Unauthorized") ||
        err.message?.includes("jwt expired") ||
        err.extensions?.code === "UNAUTHENTICATED"
      ) {
        console.warn("⚠️ Authentication error detected - attempting token refresh...");
        
        // Try to refresh the token
        if (!isRefreshing) {
          isRefreshing = true;
          
          return new Promise((resolve) => {
            refreshAccessToken()
              .then((newToken) => {
                isRefreshing = false;
                
                if (newToken) {
                  console.log("✅ Token refreshed, retrying request...");
                  
                  // Update the operation context with new token
                  const oldHeaders = operation.getContext().headers;
                  operation.setContext({
                    headers: {
                      ...oldHeaders,
                      authorization: `Bearer ${newToken}`,
                    },
                  });
                  
                  // Retry all pending requests
                  pendingRequests.forEach(callback => callback());
                  pendingRequests = [];
                  
                  // Retry the failed operation
                  resolve(forward(operation));
                } else {
                  console.error("❌ Token refresh failed - logging out");
                  // Clear tokens and redirect to login
                  clearAuthTokens();
                  pendingRequests = [];
                  
                  // Trigger logout event
                  window.dispatchEvent(new CustomEvent('forceLogout'));
                  
                  if (window.location.pathname !== "/login" && window.location.pathname !== "/") {
                    window.location.href = "/";
                  }
                  resolve(forward(operation));
                }
              })
              .catch((error) => {
                console.error("❌ Token refresh error:", error);
                isRefreshing = false;
                pendingRequests = [];
                clearAuthTokens();
                
                // Trigger logout event
                window.dispatchEvent(new CustomEvent('forceLogout'));
                
                if (window.location.pathname !== "/login" && window.location.pathname !== "/") {
                  window.location.href = "/";
                }
                resolve(forward(operation));
              });
          });
        } else {
          // If already refreshing, queue this request
          return new Promise((resolve) => {
            pendingRequests.push(() => {
              resolve(forward(operation));
            });
          });
        }
      }
    }
  }
  
  if (networkError) {
    console.error("[Network Error]:", networkError);
  }
});

export const client = new ApolloClient({
  link: from([errorLink, splitLink]),
  cache: new InMemoryCache(),
});
