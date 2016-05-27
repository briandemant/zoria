"use strict";

import React, {PropTypes} from 'react';

const propTypes = {
	type : PropTypes.string,
	class : PropTypes.oneOf(['primary', 'primary-outline', 'secondary', 'secondary-outline']),
	additionalClasses : PropTypes.string,
	text : PropTypes.string.isRequired
};

const defaultProps = {
	type: 'button',
	class: 'primary',
	additionalClasses: ''
};

export class Button extends React.Component {
	render() {
		return (
				<button type={this.props.type} className={"btn btn-" + this.props.class + " " + this.props.additionalClasses}>{this.props.text}</button>
		)
	}
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;
