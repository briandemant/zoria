import React, {PropTypes} from 'react';

import {Button, AdList} from '../../components';

const propTypes = {
	filename : PropTypes.string.isRequired
};

const defaultProps = {};

export class Style extends React.Component {
	render() {
		var ext = '.min.css';

		if (process.env.NODE_ENV === 'development') {
			ext = '.css';
		}

		var url = '/css/' + this.props.filename + ext;

		return (
			<link rel='stylesheet' type='text/css' href={url}/>
		)
	}
}

Style.propTypes = propTypes;
Style.defaultProps = defaultProps;
export default Style;