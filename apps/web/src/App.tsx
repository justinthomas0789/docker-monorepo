import { useState } from 'react';
import { Button, Typography, Container } from '@mui/material';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  cache: new InMemoryCache(),
});

const GET_FORM = gql`
  query GetForm($id: String!) {
    getForm(id: $id)
  }
`;

function AppContent() {
  const [id] = useState('1');
  const { loading, error, data } = useQuery(GET_FORM, { variables: { id } });

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        {import.meta.env.VITE_APP_NAME || 'React App'}
      </Typography>
      <Typography variant="body1">
        {loading ? 'Loading...' : error ? 'Error!' : data?.getForm}
      </Typography>
      <Button variant="contained" color="primary">
        Test GraphQL
      </Button>
    </Container>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <AppContent />
    </ApolloProvider>
  );
}

export default App;