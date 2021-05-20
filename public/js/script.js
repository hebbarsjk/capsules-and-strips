const banner = document.querySelector('#banner');
const accessLocation = document.querySelector('#access-location');
const orderMedicine = document.querySelector('#order-medicine');

var latitude;
var longitude;
var flag;

accessLocation.onclick = function () {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getLocation);
	} else {
		banner.innerHTML = 'Geolocation is not supported in this browser';
	}

	function getLocation(position) {
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		console.log(`lat:${latitude} and lon:${longitude}`);
		orderMedicine.disabled = false;
	}
};

orderMedicine.onclick = function () {
	window.location.href = '/order';
};

// // https://www.quora.com/Google-Cloud-Platform-is-not-accepting-my-debit-card-Visa-How-can-I-start-my-free-trial

// // https://support.google.com/a/answer/3401127?hl=en
