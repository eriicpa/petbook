import React from 'react'
import axios from 'axios';

import useForm from '../../Hooks/useForm'

import Button from '../Forms/Button'
import Input from '../Forms/Input'

function LoginForm() {

  const email = useForm('email');
  const password = useForm();

  async function handleSubmit(event) {
    event.preventDefault();

    if(email.validate() && password.validate()) {
      const request = {
        email: email.value,
        password_user: password.value
      }

      const {data} = await axios.post('http://localhost:3001/login', request);
      console.log(data);
    }
  }

  return (
    <section>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input 
          type="email" 
          name="email" 
          label="E-mail"
          {...email}
        />
        <Input 
          type="password" 
          name="password" 
          label="Senha"
          {...password}
        />
        <Button>Entrar</Button>
      </form>
    </section>
  )
}

export default LoginForm
