import React from 'react';

var DefaultLayout = require('../_layouts/DefaultLayout').DefaultLayout;

import {Login} from '../../components';


class LoginPage extends React.Component {
	render() {
		return (
			<DefaultLayout>
				<div>
					<h1>Login</h1>
					<pre>props: {JSON.stringify(this.props, true, 2)}</pre>
					<Login username={this.props.username} placeholder='the username'/>
				</div>
			</DefaultLayout>
		)
	}

}

const data = require('./data.js');
export default  function(qs, path, req, res) {
	data.qs = qs;
	data.path = path;
	data.path = req.path;
	return <LoginPage {...data}/>
};
 