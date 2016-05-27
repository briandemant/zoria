import React from 'react';
import glob from 'glob';
import path from 'path';
import {DefaultLayout} from '../_layouts/DefaultLayout';

import {Login} from '../../components';


class IndexPage extends React.Component {
	render() {
		
		var pageLinks = this.props.files.map(function(file) { 
			var page = path.basename(file, "Page.js");
			return <li><a href={page.toLowerCase()}>{page}</a></li>
		});
		
		return (
			<DefaultLayout>
				<div>
					<h1>Pages:</h1>
					{/*<pre>demo: {JSON.stringify(this.props, true, 2)}</pre>*/}
					<ul>{pageLinks}</ul>
				</div>
			</DefaultLayout>
		)
	}

}


export default  function(qs, path, req, res) {

	return new Promise(function(resolve, reject) {
		glob("src/pages/**/*Page.js", function(err, files) {
			if (err) {
				reject(err)
			} else {
				resolve(<IndexPage files={files}/>);
			}
		})
	})
};
