var React = require('react');

var DefaultLayout = require('../_layouts/DefaultLayout');

var List = require('../../components/list/ListComponent');
var AdList = require('../../components/ad/AdListComponent');
var AdListItem = require('../../components/ad/AdListItemComponent');
var AdThumb = require('../../components/ad/AdThumbComponent');

export default  function(qs, path, req, res) { 
 
	return (
		<DefaultLayout title="Title is fine">
			<div className="card">
				<AdList size="large">
					<AdListItem adId={1234} adUrl="/" adHeader="Ad Header 1234" adDescription="Ad description"
					            adPrice="123,45"/>
					<AdListItem adId={234} adUrl="/" adHeader="Ad Header 234" adDescription="Ad description"
					            adPrice="123,45"/>
					<AdListItem adId={345} adUrl="/" adHeader="Ad Header 345" adDescription="Ad description"
					            adPrice="123,45"/>
					<AdListItem adId={5467} adUrl="/" adHeader="Ad Header 5467" adDescription="Ad description"
					            adPrice="123,45"/>
				</AdList>
			</div>
			<ul>
				<AdThumb adId={1234} adUrl="/" adHeader="Ad Header 1234" adDescription="Ad description" adPrice="123,45"/>
				<AdThumb adId={234} adUrl="/" adHeader="Ad Header 234" adDescription="Ad description" adPrice="123,45"/>
				<AdThumb adId={345} adUrl="/" adHeader="Ad Header 345" adDescription="Ad description" adPrice="123,45"/>
				<AdThumb adId={5467} adUrl="/" adHeader="Ad Header 5467" adDescription="Ad description" adPrice="123,45"/>
			</ul>
			<div>
				<h1>Dyr med Pels.</h1>
				<List items={["Bjørn","And","Fisk"]} title=""/>
				<List items={[1,2,3,666]} title="some numbers"/>
			</div>
		</DefaultLayout>
	);
};