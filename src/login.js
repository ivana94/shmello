import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';


export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }



    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }




    handleSubmit(e) {
        e.preventDefault();

        const { email, password } = this.state;

        const data = {
            email,
            password
        }

        axios.post("/login", data).then((resp) => {
            if (resp.data.success) {
                location.replace("/")
            } else {

                this.setState({
                    error: true,
                    email: "",
                    password: ""
                })

            }

        })

    }




    render() {

        return (

            <div className = "welcome-container">

                <h2>Login</h2>

                { this.state.error && <div>wrong email or password</div> }
                <input onChange = { this.handleChange } value = { this.state.email } placeholder = "email" name = "email" />
                <input onChange = { this.handleChange } value = { this.state.password } placeholder = "password" name = "password" type = "password" />
                <button onClick={ this.handleSubmit }>login</button> <br /><br />
                <span id = "link">Don't have an account? <Link to ="/">Create one here!</Link></span>
            </div>
        )

    }



}
