import faker from  'faker';


const data = {
	"ads" : [],
	"users" : []
};

export class Db {
	getUser(id = null) {
		if (id === null) {
			id = data.users.length + 1;
		}
		if (!data.users[id]) {
			data.users[id] = {
				id : id,
				name : faker.name.findName(),
				ads : []
			}

			// data.users[id].username = data.users[id].name.trim().toLowerCase().replace(/[^0-9a-z]/g, ".").replace(/\.+/g, ".")
			// data.users[id].passwd = "user" + id;

		}
		return Promise.resolve(clone(data.users[id]))
	}

	getAd(id = null) {
		if (id === null) {
			id = data.ads.length + 1;
		} else {
			id = id | 0;
		}
		
		if (!data.ads[id]) {
			data.ads[id] = {
				id : id,
				title : faker.lorem.sentence(1 + Math.random() * 2 | 0),
				description : faker.lorem.sentence(2 + Math.random() * 3 | 0),
				price : faker.commerce.price()
			}
			return this.getUser(Math.ceil(id / 10) + Math.random() * data.users.length | 0).then(function(user) {
				data.ads[id].user = data.users[user.id];
				data.users[user.id].ads.push(id); 
				return clone(data.ads[id]);
			})
		}

		return Promise.resolve(clone(data.ads[id]))
		// return new Promise(function(resolve, reject) {
		// setTimeout(function() { 
		// resolve(clone(data.ads[id]));

		// },50)
		// })
	}

	getRawData() {
		return Promise.resolve(data)
	}

	getAds(ids) {
		var load = ({ids, ads=[]}) => {
			if (ids.length ==0) return Promise.resolve(clone(ads));
			
			var id = ids[0];
			return this.getAd(id).then((ad)=> {
				ads.push(ad);
				if (ids.length > 0) {   
					return load({ids:ids.slice(1), ads});
				} else {
					return clone(ads);
				}
			})
		}

		return load({ids : ids}).then((ads)=> {
			ads.forEach(function(ad) {
				// if (ad.user.id == 6) {
				// console.log(ad.id, ad.user);
				// } 
			})
			return ads;
		})
	}
}
export default new Db();

function clone(datum) {
	return JSON.parse(JSON.stringify(datum))
}