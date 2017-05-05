import React, { Component } from 'react';
import firebase from 'firebase';
// import uid from 'uid';
import { Button, Container, Input  } from 'muicss/react';

class App extends Component {
  constructor(props) {
    super(props);

    // Asignamiento de bind(this) a las funciones de la clase
    this.sign_up = this.sign_up.bind(this);
    this.renderLoginButton = this.renderLoginButton.bind(this);
    this.logout = this.logout.bind(this);
    this.sign_in = this.sign_in.bind(this)

    // State - declararación de los estados iniciales
    this.state = {
      user: null,
      error: null,
    }
  }

  /**
   * onAonAuthStateChanged recibe como parametro el estado de la sesión
   * el cual lo asignamos con setState al state declarado. { user: user }
   * en es6 si el nombre y valor son iguales se puede simplificar y dejar
   * solo uno ( ejemplo -> { user } ).
   */ 
      componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
          this.setState({ user })
        })
      }

  /**
   * El metodo signInWithEmailAndPassword recive como parametros
   * el usuario y contraseña para crear o establecer una sesión.
   */
      sign_in(e) {
        e.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(data => console.log(data))
        .catch(error => this.setState({ error: error.message }))
      }

  /**
   * El metodo createUserWithEmailAndPassword recive como parametros
   * el usuario y contraseña para crear un nuevo usuario.
   */ 
      sign_up(e) {
        e.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(data => console.log(data))
        .catch(error => this.setState({ error: error.message }))
      }

  /** 
   * Con el metodo signOut() podemos cerrar sesión facilmente
  */  
      logout() {
        firebase.auth().signOut()
        .then(data => console.log(data))
        .catch(error => console.log(error.message))
      }

  /**
   * La funcion renderLoginButton() ejecuta una setencia if que comprueba si el 
   * estado user es diferente a null en este caso si user tiene asignado el user 
   * que se paso en el setState en el metodo onAuthStateChanged va mostrar un hola
   * mas el user.email de la sesión mas el boton loguot y en el caso de no ser así
   * renderiza solo los botones de iniciar sesión y registrarse.
   */
      renderLoginButton() {
        if(this.state.user){
          return (
            <div>
              <p>hola { this.state.user.email } </p>
              <Button color="danger" onClick={this.logout}>Logout</Button>
            </div>
          );
        } else {
          return (
            <div>
              <div id="formulario">
                <form onSubmit={this.sign_up}>
                  <Input id="email" type="email" hint="email"/>
                  <Input id="password" type="password" hint="password" />
                </form>
                <p className="error">{this.state.error}</p>
              </div>
              <Button color="primary" onClick={this.sign_in}>Sign in</Button>
              <Button color="primary" onClick={this.sign_up}>Sign up</Button>
            </div>
          );
        }
      }

  render() {
    return (
      <Container>
        { this.renderLoginButton() } 
      </Container>
    );
  }
}

export default App;