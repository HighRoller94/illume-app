import React, { Component } from 'react';

import Login from '../Components/Auth/Login/Login';
import Signup from '../Components/Auth/Signup/Signup';

class Auth extends Component {

    state = {
        visible: true,
    }

render() {
    const buttonText = this.state.visible ? "Don't have an account?" : "Back";
    return (
        <div className="auth__page">
            <div className="bg"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div>
            <div className="auth__row">
                <div className="auth__container">
                    <div className="auth">
                        {this.state.visible ? <Login /> : <Signup />}
                        <div className="auth__text">
                            <p onClick={() => {this.setState({ visible: !this.state.visible });}}>
                            {buttonText}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default Auth
