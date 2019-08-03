import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Form, Container } from './styles'
import api from '../../services/api'
import { login } from '../../services/auth'

import Logo from '../../assets/logo.svg'

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    error: ''
  }

  handleSignup = async e => {
    e.preventDefault()
    const {  email, password } = this.state
    if (!email || !password) {
      this.setState({ error: "Todos os campos são obrigatórios" })
    } else {
      try {
        const response = await api.post("/session", { email, password })
        login(response.data.token)
        this.props.history.push('/app')
      } catch (error) {
        console.log(error.message)
        this.setState({ error: "Houve um problema com o login, verifique suas credenciais." })
      }
    }
  }

  handleOnChange = e => {
    const target = e.target
    const name = target.name
    this.setState({
      [name]: target.value
    })
  }

  render () {
    return (
      <Container>
        <Form onSubmit={this.handleSignup}>
          <img src={Logo} alt="Airbnb Logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="email"
            name="email"
            onChange={this.handleOnChange}
            placeholder="Endereço de email"
          />
          <input
            type="password"
            name="password"
            onChange={this.handleOnChange}
            placeholder="Senha"
          />
          <button type="submit">Cadastrar grátis</button>
          <hr />
          <Link to="/signup">Criar conta grátis</Link>
        </Form>
      </Container>
    )
  }
}

export default withRouter(SignIn)