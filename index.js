'use strict';

/**
 * [sorting comparator used to dynamically sort an array of objects]
 * @param  {[array]} sorts [an array of objects in the format [{field:string, direction:number},...]]
 * @return {[number]}       [-1 (less than), 0 (equal), or 1 (greater than)]
 */
function objectComparator(sorts) {
  //only consider the first sort (if two elements are equal, recursively consider subsequent sorts)
  if(sorts[0].direction == undefined) {sorts[0].direction = 1;} //default direction to 1
  return function(a,b) {
    if (traverse(a,sorts[0].field) < traverse(b,sorts[0].field)) {return -1*sorts[0].direction;}
    if (traverse(a,sorts[0].field) > traverse(b,sorts[0].field)) {return sorts[0].direction;}
    if(sorts[1] != undefined) {return objectComparator(sorts.slice(1,sorts.length))(a,b);} //these elements are equal, if there are more sorts, recursively consider subsequent sort
    return 0; //we ran out of sorts to consider so these elements are equal
  }
}

/**
 * [
 * traverse an object with a key string separated by dots to return a lower level value in a nested object
 * ex: obj = {field: {length: value}}; traverse(obj, "field.length") returns value
 * this allows you to traverse a nested or multi-leveled object with a key string in dot notation such as "field.length", since normally trying to access fields that are lower in the hierarchy with dot notation doesn't work
 * ex obj["field.length"] doesn't search for lower level fields obj = {field: {length: value}} but instead a top level field obj = {'field.length': value}
 * ]
 * @param  {[object]} obj    [a normal JavaScript object that you are trying to traverse]
 * @param  {[string]} keyStr [object fields separated using dot notation, ex: "field1.field2.etc"]
 * @return {[type]}        [description]
 */
function traverse(obj, keyStr) {
  //split the keyStr by dot notation into a array of strings
  //using the reduce function starting with object, access the values in the nested object one key at a time, eventually returning the desired lower level value
  return keyStr.split('.').reduce(function (cur, key) {
    return cur[key];
  }, obj);
};



module.exports = objectComparator;
