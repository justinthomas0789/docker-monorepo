import { useState, useEffect } from 'react';
import { Button, Typography, Container } from '@mui/material';

function App() {
  const [count, setCount] = useState(0);
  const [apiMessage, setApiMessage] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}`)
      .then((res) => res.text())
      .then((data) => setApiMessage(data))
      .catch((err) => console.error('Error:', err));
  }, []);

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        {import.meta.env.VITE_APP_NAME || 'React App'}
      </Typography>
      <Typography variant="body1">Count: {count}</Typography>
      <Typography variant="body2">API: {apiMessage || 'Loading...'}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </Button>
    </Container>
  );
}

export default App;