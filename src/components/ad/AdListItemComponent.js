"use strict";
import React, {PropTypes} from 'react';
var Ad = require('./_AdComponent');

class AdList extends Ad {

	render() {
		return (
				<li className="card col-sm-3 cmp-ad-list-item">
					<a href="{this.props.adUrl}">
						<h1 className="ad">{this.props.adHeader}</h1>
						<p>{this.props.adDescription}</p>
						<p>Kr. <span>{this.props.adPrice}</span></p>
					</a>
				</li>
		)
	}
}

AdList.propTypes = Ad.propTypes;
export default AdList;