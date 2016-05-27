import React from 'react';
import BaseStyle from './BaseStyle';

const propTypes = {
	title : React.PropTypes.number.isRequired,
	body : React.PropTypes.string.isRequired
};

const defaultProps = {
	title : "no title given"
};

class DefaultLayout extends React.Component {
	render() {
		return (
			<html lang='da'>
			<head>
				<meta charset='UTF-8'/>
				<title>[ {this.props.title} ]</title>
				<BaseStyle filename="base"/>
			</head>
			<body>
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-12">
							{this.props.children} 
						</div>
					</div>
				</div>
			</body>
			</html>
		);
	}
}


DefaultLayout.propTypes = propTypes;
DefaultLayout.defaultProps = defaultProps;

export default DefaultLayout 