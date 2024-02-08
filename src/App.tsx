import { QueryClient, QueryClientProvider } from "react-query";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Pokedex } from "./components/Pokedex";
import "./App.css";

const queryClient = new QueryClient();

const client = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <Pokedex />
      </ApolloProvider>
    </QueryClientProvider>
  );
}

export default App;
