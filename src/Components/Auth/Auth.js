import React, { Component } from 'react'

import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Fade from 'react-reveal/Fade'

import './Auth.css'

class Auth extends Component {

    state = {
        visible: true,
    }

render() {

    const buttonText = this.state.visible ? "Don't have an account?" : "Back";

    return (
        <div>
            <Fade delay = {200}>
                <div className="auth_container">
                    <div className="auth_row">
                        <div className="auth">
                            {this.state.visible ? <Login /> : <Signup />}
                            <div className="auth_col">
                                <p onClick={() => {this.setState({ visible: !this.state.visible });}}>
                                {buttonText}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
        </div>
    )
}
}

export default Auth
