"use strict";

import React, {PropTypes} from 'react';

const propTypes = {
	type : PropTypes.string,
	class : PropTypes.string.oneOf(['primary', 'primary-outline', 'secondary', 'secondary-outline']),
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
				<button type={this.props.type} className={"btn btn-" + this.props.buttonClass + " " + this.props.buttonAdditionalClasses}>{this.props.buttonText}</button>
		)
	}
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;
