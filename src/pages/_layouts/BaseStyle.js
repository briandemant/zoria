

import React, {PropTypes} from 'react';

const propTypes = { 
	filename : PropTypes.string.isRequired 
};

const defaultProps = { 
};

class List extends React.Component {
	render() {
		var fileExtention;
		if (process.env.NODE_ENV === 'development') {
			fileExtention = '.css';
		} else {
			fileExtention = '.min.css';
		}
		
		var url = '/css/' +this.props.filename + fileExtention;
		 
		return (
				 <link rel='stylesheet' type='text/css' href={url}/> 
		)
	}
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;
export default List;