var React = require('react');

var DefaultLayout = require('../_layouts/DefaultLayout');

var List = require('../../components/list/ListComponent');
 
var content =
	<div>
		<h1>Dyr med Pelses.</h1>
		<List items={["Bjørn","And","Fisk"]} title=""/>
		<List items={[1,2,3,88]} title="some numbers"/>
	</div>;

export default <DefaultLayout children={content} title="Title is fine"/>