import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom'
import {register} from "../../services/RegisterApi";

const useStyles = styled(({theme}) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const Form = ({ handleClose }) => {
  const classes = useStyles();
  // create state variables for each input
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');


  const handleSubmit = e => {
    e.preventDefault();
    console.log(firstName, lastName, email, password, username);
    handleClose();
  };

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    promo: '01/09/2021',
    birthday: '01/09/2021'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
        ...values,
        [name]: value
    });
  };

  const URLApi = 'http://127.0.0.1:8080/api/'

  useEffect( async () => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
        console.log(values);
        try {

        const response = await register(values);
        console.log('NOICE')
        } catch ({response}) {
                console.log('ERREUR')
        }
    }
},
[errors]
);

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        variant="filled"
        required
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        variant="filled"
        required
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
      <TextField
        label="Username"
        variant="filled"
        type="username"
        required
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      
      <div>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Signup
        </Button>
      </div>
    </form>
  );
};

export default Form;
