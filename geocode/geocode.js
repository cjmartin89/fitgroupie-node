const axios = require('axios');

function getCoordinates(address) {
    var encodedAddress = encodeURIComponent(address);
    var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

    return new Promise(function(resolve,reject) {
        axios.get(geocodeUrl).then((response) => {
            if (response.data.status === 'ZERO_RESULTS') {
                reject('Unable to find that address');
            }
            resolve({
                lat : lat = response.data.results[0].geometry.location.lat,
                long: lng = response.data.results[0].geometry.location.lng
            })
        });
    })
}

module.exports = {
    getCoordinates
}