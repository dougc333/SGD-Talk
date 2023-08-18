import LoginForm from './components/LoginForm';
import {Grid} from '@mui/material'


function App() {
  return (  
    <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
  sx={{ minHeight: '100vh' }}
>
  <Grid item xs={3}>
    <LoginForm />
  </Grid>
</Grid>
  );
}

export default App;
