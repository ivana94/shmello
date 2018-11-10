import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';


export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }



    handleChange(e) {

        this.setState({
          [e.target.name]: e.target.value
        });

    }



    handleSubmit() {
        axios.post("/register", this.state).then((resp) => {
          console.log("resp: ", resp);
            if (resp.data.success) {
                location.replace("/")
            } else {
                this.setState({ error: true })
            }
        })
    }


    render() {
        return (

            <div className = "welcome-container">

                <h2>Register</h2>

                    { this.state.error && <div>error</div> }
                    <input autoComplete = "off" onChange = { this.handleChange } placeholder = "first" name = "first" />
                    <input autoComplete = "off" onChange = { this.handleChange } placeholder = "last" name = "last" />
                    <input autoComplete = "off" onChange = { this.handleChange } placeholder = "email" name = "email" />
                    <input autoComplete = "off" onChange = { this.handleChange } placeholder = "password" name = "password" type = "password" />
                    <button onClick={ this.handleSubmit }>register</button><br /><br />
                    <span id = "link">Already have an account? <Link to = "/login" >Login here!</Link></span>

            </div>


        )



    }



}
