"use strict";
import React, {PropTypes} from 'react';
var Ad = require('./_AdComponent');

export class AdListItem extends Ad { 
	render() {
		var itemUrl = `ad/${this.props.id}`;
		return (
				<li className="card col-sm-3 cmp-ad-list-item">
					<a href={itemUrl}>
						<h1 className="ad">{this.props.title}</h1>
						<p>{this.props.description}</p>
						<p>Kr. <span>{this.props.price}</span></p>
					</a>
				</li>
		)
	}
}

AdListItem.propTypes = Ad.propTypes;
export default AdListItem;