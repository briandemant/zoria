import React from 'react';
import faker from 'faker';

import {DefaultLayout} from '../_layouts/DefaultLayout';

import Db from '../../server/db';
import {AdList, Json} from '../../components';


class AdlistPage extends React.Component {
	render() {
		var debug = <Json data={Db.getRawData()}/>;
		return (
			<DefaultLayout>
				<div>
					<h1>Ads:</h1>
					<AdList items={this.props.items}/>
				
				</div>
				{debug}
			</DefaultLayout>
		)
	}

}

export default function(qs, path, req, res) {
	return new Promise(function(resolve, reject) {
		var data = {items : []};
		for (var i = 0; i < 8; i++) {
			data.items.push( Db.getAd(i))
		}
		resolve(<AdlistPage {...data} item={data.items}/>);
	})
};
