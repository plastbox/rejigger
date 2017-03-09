# Rejigger

Rejigger lets you create transform functions for, you guessed it, rejiggering your objects.

## Installation

You need npm installed:

```sh
$ npm install rejigger
```

## Example

```javascript
'use strict';
var rejigger = require('rejigger');

var msg = {
	time: {
		event_time: '2017-03-07T13:01:11.000Z',
		server_time: '2017-03-07T13:02:14.941Z'
	},
	priority: 0,
	priority_label: 'Low',
	gps: {
		latitude: 59.131676,
		longitude: 10.196493,
		altitude: 155,
		angle: 250,
		satellites: 14,
		speed: 0
	},
	event_id: 248,
	io_elements: {
		inputs: [1,0],
		outputs: [1,1]
	}
};
var test = rejigger({
	trans_reason: 'get(event_id) == 248 ? 69 : (get(event_id) == 247 ? 53 : 44)',
	num_of_satellites: 'get(gps.satellites)',
	latitude: 'get(gps.latitude)',
	longitude: 'get(gps.longitude)',
	altitude: 'get(gps.altitude)',
	speed: 'get(gps.speed)',
	logged_time: 'get(time.event_time)',
	logged_time_server: 'get(time.server_time)',
	digital_in_1: 'get(io_elements.inputs.0)',
	digital_in_2: 'get(io_elements.inputs.1)',
	
	IO: {
		digital_in_1: 'get(io_elements.inputs.0)',
		digital_in_2: 'get(io_elements.inputs.1)'
	},
	IOarr: [
		'get(io_elements.inputs.0)',
		'get(io_elements.inputs.1)',
		'get(io_elements.outputs.0)',
		'get(io_elements.outputs.1)'
	],
	digital_out_A: 'get(io_elements.outputs.0)',
	digital_out_B: 'get(io_elements.outputs.1)',
	error_maybe: 'get(none.of.these.properties.exist)'
});
console.log('test:', test(msg));
```
```javascript
// Outputs:
{
	trans_reason: 69,
	num_of_satellites: 14,
	latitude: 59.131676,
	longitude: 10.196493,
	altitude: 155,
	speed: 0,
	logged_time: '2017-03-07T13:01:11.000Z',
	logged_time_server: '2017-03-07T13:02:14.941Z',
	digital_in_1: 1,
	digital_in_2: 0,
	IO: {
		digital_in_1: 1,
		digital_in_2: 0
	},
	IOarr: [ 1, 0, 1, 1 ],
	digital_out_A: 1,
	digital_out_B: 1,
	error_maybe: undefined
}
```

## Extending an existing object
Rejigger supports extending existing objects. You can even wrap several levels of rejiggering!
## Example

```javascript
'use strict';
var rejigger = require('rejigger');
var data = {
	date: new Date,
	firstname: 'John',
	lastname: 'Smith',
	entries: [
		{act: 1, date: new Date(Date.now() - 5000)},
		{act: 0, date: new Date(Date.now() - 15000)},
		{act: 1, date: new Date(Date.now() - 345000)},
		{act: 0, date: new Date(Date.now() - 513000)}
	]
};

var outer = rejigger({
	name: 'get(firstname) + " " + get(lastname)',
});
var inner = rejigger({
	action: 'get(act) == 1 ? "login" : "logout"',
	time: 'get(date)'
});

console.log(data.entries.map(function(entry) {
	return inner(entry, outer(data));
}));
```
```javascript
// Outputs:
[
	{
		name: 'John Smith',
		action: 'login',
		time: '2017-03-09T19:52:58.476Z'
	}, {
		name: 'John Smith',
		action: 'logout',
		time: '2017-03-09T19:52:48.476Z'
	}, {
		name: 'John Smith',
		action: 'login',
		time: '2017-03-09T19:47:18.476Z'
	}, {
		name: 'John Smith',
		action: 'logout',
		time: '2017-03-09T19:44:30.476Z'
	}
]
```
License
----
ISC
