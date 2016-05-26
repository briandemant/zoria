import React, {PropTypes} from 'react';
import {Button} from '../../components/login/LoginComponent';
const propTypes = {
    username: PropTypes.string.isRequired,
    placeholder: PropTypes.string
};

const defaultProps = {
    placeholder: 'username'
};

export class Login extends React.Component {
    render() {
        return (
            <div class="panel-body">
                <fieldset>
                    <div class="form-group">
                        <input class="form-control" placeholder={this.props.placeholder} value={this.props.username} name="email" type="email" autofocus />
                    </div>
                    <div class="form-group">
                        <input className="form-control" placeholder="Password" name="password" type="password"  />
                    </div>
                    <button type="submit" class="btn btn-lg btn-success btn-block">Login</button>
                </fieldset>
            </div>
        )
    }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;
export default Login;