import * as localforage from 'localforage';

export const db = localforage.createInstance({
	version: 1,
	name: 'cauacts',
});

db.getItem('index').then(a => console.log(a));
db.setItem('index', { number: 0 });
