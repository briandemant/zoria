"use strict";
import React, {PropTypes} from 'react';
var Ad = require('./_AdComponent');

import {AdListItem} from './AdListItemComponent';

export class AdList extends Ad {
	render() {
		var ads = this.props.items.map((item)=> {
			return <AdListItem {...item} />
		});

		return (
			<ul className={"card cmp-ad-list cmp-ad-list-" + this.props.size}>
				{ads}
			</ul>
		)
	}
}


AdList.propTypes = Ad.propTypes;
export default AdList;