import React from 'react';

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
				<link rel='stylesheet' type='text/css' href='/css/app.css'/>
			</head>
			<body>
				{this.props.children}
			</body>
			</html>
		);
	}
}


DefaultLayout.propTypes = propTypes;
DefaultLayout.defaultProps = defaultProps;

export default DefaultLayout 