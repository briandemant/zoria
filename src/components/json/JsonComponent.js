import React, {PropTypes} from 'react';

import {Button, AdList} from '../../components';

const propTypes = {};

const defaultProps = {};

export class Json extends React.Component {
	render() {
		return (
			<pre>{JSON.stringify(this.props, true, 3)}</pre>
		)
	}
}

Json.propTypes = propTypes;
Json.defaultProps = defaultProps;
export default Json;