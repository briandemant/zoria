"use strict";
import React, {PropTypes} from 'react';
var Ad = require('./_AdComponent');

class AdList extends Ad {

	render() {
		return (
					<ul className={"card cmp-ad-list cmp-ad-list-" + this.props.size}>{this.props.children}
					</ul>
		)
	}
}

AdList.propTypes = Ad.propTypes;
export default AdList;