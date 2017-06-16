import React from "react"

import { Link } from "react-router-dom"

import Form from 'components/utils/form'
import UserClient from 'clients/user'

class Signup extends React.Component {

  constructor(props) {
    super(props);

    this.fields = [
      {
        name: "firstname",
        label: "Prénom",
        placeholder: "Prénom",
        type: "text",
        required: true
      },
      {
        name: "lastname",
        label: "Nom",
        placeholder: "Nom",
        type: "text",
        required: true
      },
      {
        name: "email",
        label: "Email",
        placeholder: "Email",
        type: "email",
        required: true
      },
      {
        name: "pseudo",
        label: "Pseudo",
        placeholder: "Pseudo",
        type: "text",
        required: true
      },
      {
        name: "password",
        label: "Mot de passe",
        placeholder: "Mot de passe",
        type: "password",
        required: true
      },
      {
        name: "password_confirm",
        label: "Confirmation du mot de passe",
        placeholder: "Confirmation du mot de passe",
        type: "password",
        required: true,
        confirmFor: "password"
      },
      {
        name: "cgu",
        label: "J'accepte les condition générales d'utilisation",
        type: "checkbox",
        required: true,
        wanted: true
      }
    ];

    this.state = {
      submitted: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitComplete = this.handleSubmitComplete.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  render() {
    if (this.state.submitted) {
      return (
        <div>
          <span>Inscription Réussi</span>
          <p>Votre inscription a bien été prise en compte. Vous pouvez maintenant accéder à votre compte en vous connectant grâce au formulaire disponible <Link to='/login'>ICI</Link></p>
          <p>Si vous souhaitez procéder à une autre inscription, cliquez <a href="#" onClick={this.resetForm}>LA</a></p>
        </div>
      )
    } else {
      return (
        <Form id="signup-form" 
              fields={this.fields} 
              submitLabel="M'enregistrer" 
              onSubmit={this.handleSubmit} 
              service={{client: UserClient, func: "signup"}}
              onSubmitComplete={this.handleSubmitComplete}
              onSubmitError={this.handleSubmitError}
        />
      )
    }
  }

  handleSubmit(values) {
  }

  handleSubmitComplete(data) {
    this.setState({submitted: true})
  }

  handleSubmitError(data) {
    console.log("submit error !")
  }

  resetForm(e) {
    e.preventDefault()
    this.setState({submitted: false})
  }

}

export default Signup;
