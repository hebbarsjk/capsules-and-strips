const { MongoClient } = require('mongodb');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const path = require('path');
const medicineModel = require('./models/medicineSchema');

const client = new MongoClient(
	'mongodb+srv://user:test@123@cluster0.vcxhz.mongodb.net/medicine?retryWrites=true&w=majority'
);
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

var collection;

app.get('/', (request, response) => {
	response.render('index');
});

app.get('/order', (request, response) => {
	response.render('order');
});

app.get('/search/', async (request, response) => {
	// var regex = new RegExp(req.query['term'], 'i');
	// var filter = medicineModel
	// 	.find({ name: regex }, { name: 1 })
	// 	.sort({ updated_at: -1 })
	// 	.sort({ created_at: -1 })
	// 	.limit(20);
	// filter.exec(function (err, data) {
	// 	console.log(data);
	// 	var result = [];
	// 	if (!err) {
	// 		if (data && data.length && data.length > 0) {
	// 			data.forEach((item) => {
	// 				let obj = {
	// 					id: item._id,
	// 					label: item.name,
	// 				};
	// 				result.push(obj);
	// 			});
	// 		}
	// 		res.jsonp(result);
	// 	}
	// });

	try {
		let result = await collection
			.aggregate([
				{
					$search: {
						autocomplete: {
							query: `${request.query.term}`,
							path: 'name',
							fuzzy: {
								maxEdits: 2,
								prefixLength: 3,
							},
						},
					},
				},
			])
			.toArray();
		response.send(result);
	} catch (e) {
		response.status(500).send({ message: e.message });
	}
});

app.listen(PORT, async () => {
	try {
		await client.connect();
		collection = client.db('medicine').collection('search');
	} catch (e) {
		console.error(e);
	}
});
