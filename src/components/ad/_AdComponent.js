import React, {PropTypes} from 'react';

const propTypes = {
	id          : PropTypes.number.isRequired,
	url         : PropTypes.string.isRequired,
	header      : PropTypes.string.isRequired,
	description : PropTypes.string.isRequired,
	price       : PropTypes.string.isRequired
};

const defaultProps = {
    title: 'Hello Worlds'
};

class Ad extends React.Component {
	render() {
		return (
				""
		)
	}
}

Ad.propTypes = propTypes;
Ad.defaultProps = defaultProps;
export default Ad;