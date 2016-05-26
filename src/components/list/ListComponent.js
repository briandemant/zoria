import React, {PropTypes} from 'react';

const propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    text: PropTypes.string
};

const defaultProps = {
    title: 'Hello Worlds'
};

export class List extends React.Component {
	render() {
		let title;
		if (this.props.title) {
			title = (<h5 className="list">{this.props.title}</h5>)
		}
		return (
			<ul>
				{title}
				{this.props.items.map(function (item) {
                    return <li>{item}</li>
                })}
            </ul>
        )
    }
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;
export default List;