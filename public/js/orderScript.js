let add = document.querySelector('#addDiv');
let remove = document.querySelector('#removeDiv');
var formOne = document.querySelector('#formOne');

add.onclick = function () {
	let newDiv = document.createElement('div');
	newDiv.classList.add('form-group', 'row');

	let medicine = document.createElement('input');
	medicine.type = 'text';
	medicine.placeholder = 'Medicine name';
	medicine.classList.add('form-control', 'col-sm-6');

	let quantity = document.createElement('input');
	quantity.type = 'text';
	quantity.placeholder = 'Quantity';
	quantity.classList.add('form-control', 'col-sm-3');

	newDiv.append(medicine);
	newDiv.append(quantity);
	formOne.append(newDiv);
};

remove.onclick = function () {
	formOne.removeChild(formOne.lastChild);
};
