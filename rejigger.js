'use strict';
module.exports = rejigger;

function rejigger(rules) {
	return new Function('msg', `function get(path) {
	var tmp;
	return (tmp = path.split('.').reduce((o,i) => { return o.hasOwnProperty(i) ? o[i] : false; }, msg)) === false ? undefined : tmp;
}
return {${Object.keys(rules).map(function(key) { return "\n\t" + key + ': ' + rules[key].replace(/(get)\(([\w\.\[\]]+)\)/g, '$1("$2")'); })}
};`);
}