import React, {PropTypes} from 'react';
import {AdListItem} from './AdListItemComponent';

const propTypes = {
	items : PropTypes.array.isRequired,
	size : PropTypes.number.isRequired
};

const defaultProps = {
	size : 'large'
};
export class AdList extends React.Component {
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


AdList.propTypes = propTypes;
AdList.defaultProps = defaultProps;
export default AdList;