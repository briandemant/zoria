import React from 'react';
import {Style} from '../../components';

const propTypes = {
	title : React.PropTypes.string
};

const defaultProps = {
	title : "no title given"
};

export class DefaultLayout extends React.Component {
	render() { 
		return (
			<html lang='da'>
			<head>
				<meta charset='UTF-8'/>
				<title>[ {this.props.title} ]</title>
				<Style filename="base"/>
			</head>
			<body>
				<div className="container">
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