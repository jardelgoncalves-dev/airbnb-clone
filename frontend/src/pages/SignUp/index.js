import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Form, Container } from './styles'
import api from '../../services/api'

import Logo from '../../assets/logo.svg'

class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    error: ''
  }

  handleSignup = async e => {
    e.preventDefault()
    const { username, email, password } = this.state
    if (!username || !email || !password) {
      this.setState({ error: "Todos os campos são obrigatórios" })
    } else {
      try {
        await api.post("/users", { username, email, password })
        this.props.history.push('/')
      } catch (error) {
        console.log(error.message)
        this.setState({ error: "Ocorreu um erro ao cadastrar o usuário" })
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
            type="text"
            name="username"
            onChange={this.handleOnChange}
            placeholder="Nome do usuário"
          />
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
          <Link to="/">Fazer login</Link>
        </Form>
      </Container>
    )
  }
}

export default withRouter(SignUp)