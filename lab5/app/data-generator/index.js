const fs = require('fs');
const faker = require('faker');
const csv = require('csv-parser');

const clearFile = () => 
    new Promise((resolve, reject) => {
        fs.writeFile('data.csv', '', err => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })

const appendToFile = data => 
    new Promise((resolve, reject) => {
        fs.appendFile('data.csv', data, err => {
            if (err) {
                reject(err);
            } else {
                resolve()
            }
        });
    });
const writeToStream = (stream, data) => {
    return new Promise((resolve, reject) => {
        stream.write(data,() => resolve());
    })
}
const driverReviews = [
    [
        'Nobody to pick us up',
        'Never showed up',
    ], [
        'No English speaking driver', 
        'Car type mismatch',
        'Late pickup',
    ], [
        'Extra cash',
        'Unprofessional',
    ], [
        'Safe, comfortable ride',
    ], [
        'Great service', 
        'Excelent service'
    ]
];

const clientReviews = [
    [
        "Didn't pay"
    ],[
        "Late"
    ], [
        "Very loudly"
    ], [
        "Good",
    ], [
        "Excelent"
    ]
]

const usdPerKm = 1.6531100478;
const nightCoef = 1.7;
const distance = (lat1, lon1, lat2, lon2, unit = 'K') => {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		const radlat1 = Math.PI * lat1/180;
		const radlat2 = Math.PI * lat2/180;
		const theta = lon1-lon2;
		const radtheta = Math.PI * theta/180;
		let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max) + 1;
    return Math.floor(Math.random() * (max - min)) + min;
}

const getCoords = async () => {
    return new Promise((resove) => {
        const coords = [];
        fs.createReadStream('../postcodes.csv_')
        .pipe(csv())
        .on('data', ({Longitude, Latitude}) => {
            coords.push({Longitude, Latitude})
        })
        .on('end', () => {
            resove(coords);
        })
    });
}

const writeDate = async (coords) => {
    await clearFile();
    const  stream = fs.createWriteStream('data.csv', {flags: 'a'});
    await appendToFile('Driver,Client,Start Point Longitude,Start Point Latitude,End Point Longitude,End Point Latitude,Start Time,Price,Duration,Driver Score,Driver Review,Client Score,Client Review,Text Review\n');
    for(let i = 0; i < 5000; i++) {
        const data = [];
        for (let j = 0; j < 10000; j++) {
            const startPoint = faker.random.arrayElement(coords);
            const endPoint = faker.random.arrayElement(coords);
            const startTime = getRandomInt(1,24);
            const distanceInKm = distance(startPoint.Latitude, startPoint.Longitude, endPoint.Latitude, endPoint.Longitude);
            const driverScore = getRandomInt(1, 5);
            const driverReview = faker.random.arrayElement(driverReviews[driverScore - 1]);
            const clientScore = getRandomInt(1,5);
            const clientReview = faker.random.arrayElement(clientReviews[clientScore - 1]);
            let price = usdPerKm * distanceInKm;

            if (startTime <= 4 && startTime > 23) {
                price = price * nightCoef;
            }

            const trip = {
                driver: faker.name.findName(),
                client: faker.name.findName(),
                startPointLong: startPoint.Longitude,
                startPointLat: startPoint.Latitude,
                endPointLong: endPoint.Longitude,
                endPointLat: endPoint.Latitude,
                startTime,
                price,
                duration: distanceInKm / 50,
                driverScore: driverScore,
                driverReview,
                clientScore,
                clientReview,
                textReview: faker.lorem.sentence()
            };

            data.push(trip);
        }
        await writeToStream(stream, data.map(trip => `"${trip.driver}","${trip.client}","${trip.startPointLong}","${trip.startPointLat}","${trip.endPointLong}","${trip.endPointLat}","${trip.startTime}","${trip.price}","${trip.duration}","${trip.driverScore}","${trip.driverReview}","${trip.clientScore}","${trip.clientReview}","${trip.textReview}"`).join('\n'))
    }
}

const main = async function () {
    const coords = await getCoords();
    writeDate(coords);
}

main();