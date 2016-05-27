import React, {PropTypes} from 'react';

const propTypes = {
	filename : PropTypes.string.isRequired
};

const defaultProps = {};

export class Script extends React.Component {
	render() {
		var ext = '.min.js';

		if (process.env.NODE_ENV === 'development') {
			ext = '.js';
		}

		var url = '/js/' + this.props.filename + ext;

		return (
			<script src={url}></script>
		)
	}
}

Script.propTypes = propTypes;
Script.defaultProps = defaultProps;
export default Script;