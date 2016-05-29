import React from 'react';
import faker from 'faker';

import {DefaultLayout} from '../_layouts/DefaultLayout';

import Db from '../../server/db';
import {AdList, Json} from '../../components';


class AdlistPage extends React.Component {
	render() {
		var debug// = <Json data={this.props.raw}/>;
		return (
			<DefaultLayout>
				<div>
					<h1>Ads:</h1>
					{debug}
					<AdList items={this.props.items}/>
				</div>

			</DefaultLayout>
		)
	}
}


export default function(qs, path, req, res) {
	return Db.getAds([1, 2, 3, 4, 5, 6, 7, 8
		, 9, 10, 11, 12, 13, 14, 15, 16,17,18,19,20,21,22,23,24,25,26,27,28,29,30
	]).then(function(ads) {
		return Db.getRawData().then(function(raw) {
			return <AdlistPage raw={raw} items={ads}/>
		})
	})
};
