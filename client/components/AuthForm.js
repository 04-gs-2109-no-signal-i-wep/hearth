import { connect } from 'react-redux';
import { authenticate } from '../store';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import auth from '../store/auth';

const theme = createTheme({
  typography: {
    fontFamily: ['Work Sans'].join(','),
  },
  palette: {
    primary: {
      main: '#5b7b7a',
    },
    secondary: {
      main: '#ceb5a7',
    },
  },
});

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#ceb5a7' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {displayName}
          </Typography>
          {displayName === 'Login' ? (
            <Box
              component="form"
              onSubmit={handleSubmit}
              name={name}
              noValidate
              sx={{ mt: 1 }}
              p={2}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email_address"
                label="Email Address"
                name="email_address"
                autoComplete="email_address"
                autoFocus
                type="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {displayName}
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box
              component="form"
              onSubmit={handleSubmit}
              name={name}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="first_name"
                label="First Name"
                name="first_name"
                autoComplete="first_name"
                autoFocus
                type="text"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="last_name"
                autoFocus
                type="text"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email_address"
                label="Email Address"
                name="email_address"
                autoComplete="email_address"
                autoFocus
                type="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {displayName}
              </Button>
              <Link href="login" variant="body2">
                {'Already have an account? Log in.'}
              </Link>
            </Box>
          )}
        </Box>
        {error && error.response && <div> {error.response.data} </div>}
      </Container>
    </ThemeProvider>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email_address = evt.target.email_address.value;
      const password = evt.target.password.value;

      if (formName === 'login') {
        dispatch(authenticate(email_address, password, formName));
      } else {
        const first_name = evt.target.first_name.value;
        const last_name = evt.target.last_name.value;

        dispatch(
          authenticate(email_address, password, formName, first_name, last_name)
        );
      }
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
