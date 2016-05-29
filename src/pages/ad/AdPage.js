import React from 'react';
import faker from 'faker';

import {DefaultLayout} from '../_layouts/DefaultLayout';

import Db from '../../server/db';

import {AdList, AdListItem, Json} from '../../components';


class AdPage extends React.Component {
	render() {
		var ad = this.props.ad;

		var debug //= <Json data={ this.props}/>;
		return (
			<DefaultLayout>
				<div className="row">
					<h1>Ad:</h1>
					<ul><AdListItem {...ad}></AdListItem></ul>
				</div>
				<div className="row">
					<h1>Other ads owned by {ad.user.name}:</h1>
					<AdList items={this.props.other}/>
				</div>
				<a href="/adlist">Tilbage</a>
				{debug}
			</DefaultLayout>
		)
	}
}


export default function(qs, path, req, res) {
	return Db.getAd(path[0] | 0).then(function(ad) {
		return Db.getAds(ad.user.ads).then(function(ads) {
			return <AdPage ad={ad} other={ads}/>
		})
	})
};
