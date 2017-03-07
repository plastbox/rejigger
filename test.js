var rejigger = require('.');

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
	
	digital_out_A: 'get(io_elements.outputs.0)',
	digital_out_B: 'get(io_elements.outputs.1)',
	error_maybe: 'get(none.of.these.properties.exist)'
});
console.log('test:', test(msg));