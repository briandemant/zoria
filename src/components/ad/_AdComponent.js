import React, {PropTypes} from 'react';

const propTypes = {
	adId          : PropTypes.number.isRequired,
	adUrl         : PropTypes.string.isRequired,
	adHeader      : PropTypes.string.isRequired,
	adDescription : PropTypes.string.isRequired,
	adPrice       : PropTypes.string.isRequired
};

class Ad extends React.Component {
	render() {
		return (
				""
		)
	}
}

Ad.propTypes = propTypes;
export default Ad;