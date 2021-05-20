const mongoose = require('mongoose');

const { Schema } = mongoose;

const medicineSchema = new Schema({
	name: String,
});

module.exports = medicineSchema;
