import React from 'react';

var DefaultLayout = require('../_layouts/DefaultLayout');

import {Login} from '../../components';


class PrivatePage extends React.Component {
	render() {
		return (
			<DefaultLayout>
				<div>
					<h1>Hey Demo</h1>
					<pre>demo: {JSON.stringify(this.props, true, 2)}</pre> 
				</div>
			</DefaultLayout>
		)
	}

}

const data = require('./data.js');
export default  function(qs, path, req, res) {
	data.qs = qs;
	data.qwe = path;
	data.path = req.path;
	return <PrivatePage {...data}/>
};
 