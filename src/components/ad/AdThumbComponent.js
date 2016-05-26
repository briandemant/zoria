"use strict";
import React, {PropTypes} from 'react';
var Ad = require('./AdComponent');

class AdThumb extends Ad {

	render() {
		return (
				<li style={{display: "inline-block"}}>
					<a href="{this.props.adUrl}">
						<h1 className="ad">{this.props.adHeader}</h1>
						<p style={{display: "inline-block"}}>{this.props.adDescription}</p>
						<p style={{display: "inline-block"}}>Kr. <span>{this.props.adPrice}</span></p>
					</a>
				</li>
		)
	}
}

AdThumb.propTypes = Ad.propTypes;
export default AdThumb;