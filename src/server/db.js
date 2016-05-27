import faker from  'faker';

const data = {
	"ads" : [],
	"users" : []
};

export class Db {
	getUser(id=null) {
		if (id === null) {
			id = data.users.length + 1;
		}
		if (!data.users[id]) {
			data.users[id] = {
				id : id,
				name : faker.name.findName()
			}
		}
		return data.users[id]
	}

	getAd(id=null) {
		if (id === null) {
			id = data.ads.length + 1;
		}
		if (!data.ads[id]) {
			data.ads[id] = {
				id : id,
				title : faker.lorem.sentence(1 + Math.random() * 2 | 0),
				description : faker.lorem.sentence(2 + Math.random() * 3 | 0),
				price : faker.commerce.price(),
				user : this.getUser()
			}
		}
		return data.ads[id]
	}

	getRawData() { 
		return data
	}
}
export default new Db();