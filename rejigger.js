'use strict';
module.exports = rejigger;

function rejigger(rules) {
	function subjigger(rules) {
		var strRetObj = '';
		if(rules instanceof Array) {
			Object.keys(rules).forEach(function(key) {
				strRetObj+= ( typeof rules[key] === 'object' ? subjigger(rules[key]) : rules[key].replace(/(get)\(([\w\.\[\]]+)\)/g, '$1("$2")')) + ",\n";
			});		
			return '[' + strRetObj + ']';
		}
		Object.keys(rules).forEach(function(key) {
			strRetObj+= key + ': ' + ( typeof rules[key] === 'object' ? subjigger(rules[key]) : rules[key].replace(/(get)\(([\w\.\[\]]+)\)/g, '$1("$2")')) + ",\n";
		});
		return '{' + strRetObj + '}';
	}
	return new Function('msg', `function get(path) {
	var tmp;
	return (tmp = path.split('.').reduce((o,i) => { return o.hasOwnProperty(i) ? o[i] : false; }, msg)) === false ? undefined : tmp;
};
return ${subjigger(rules)}`);
}