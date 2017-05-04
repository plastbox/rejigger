'use strict';
module.exports = rejigger;

function rejigger(rules) {
	function subjigger(rules) {
		var strRetObj = '';
		if(rules instanceof Array) {
			Object.keys(rules).forEach(function(key) {
				strRetObj+= ( typeof rules[key] === 'object' ? subjigger(rules[key]) : rules[key].replace(/(get)\(([\w\(\) \.\[\]]+)\)/g, '$1("$2")').replace(/\]/g, '').replace(/\[/g, '.')) + ",\n";
			});		
			return '[' + strRetObj + ']';
		}
		Object.keys(rules).forEach(function(key) {
			strRetObj+= key + ': ' + ( typeof rules[key] === 'object' ? subjigger(rules[key]) : rules[key].replace(/(get)\(([\w\(\) \.\[\]]+)\)/g, '$1("$2")').replace(/\]/g, '').replace(/\[/g, '.')) + ",\n";
		});
		return '{\n' + strRetObj + '}';
	}
	return new Function('msg', 'base', `function get(path) {
	var tmp;
	return (tmp = path.split('.').reduce((o,i) => { return o.hasOwnProperty(i) ? o[i] : false; }, msg)) === false ? undefined : tmp;
};
return Object.assign(base || {}, ${subjigger(rules)});`);
}
