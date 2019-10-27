# objectComparator

This comparator function allows you to sort an array of objects:
1. by multiple criteria (ex: first by field1, then by field2)
2. in any direction (ex: forwards or backwards)
3. by nested field values (ex: "field1.field2.etc")

## Install
```
npm install --save harryli0088/objectComparator
```

## Usage
Supply the objectComparator function as an argument for the array.sort() function.

Supply an array of sort criteria to objectComparator in the format:
```js
[
  {field: "field1", direction: 1},
  {field: "field2", direction: -1},
  ...
]
```

where field is a string value that accepts nested fields using dot notation

and where direction is a number, usually 1 or -1 to indicate sorting direction

## Examples

Sorting a simple array of objects
```js
const objectComparator = require('objectComparator');

let simpleArray = [
  {test: 2},
  {test: 1},
  {test: 3},
  {test: 4},
  {test: 5},
];

simpleArray.sort(objectComparator( [{field:"test",direction:1}] )); //sort the array going forwards
simpleArray.sort(objectComparator( [{field:"test",direction:-1}] )); //sort the array going backwards
```


Sorting an array of nested objects
```js
const objectComparator = require('objectComparator');

let nestedArray = [
  {field: {test: 3}},
  {field: {test: 2}},
  {field: {test: 5}},
  {field: {test: 4}},
  {field: {test: 1}},
];


nestedArray.sort(objectComparator( [{field:"field.test",direction:1}] )); //sort the array going forwards
nestedArray.sort(objectComparator( [{field:"field.test",direction:-1}] )); //sort the array going backwards
```


Sorting an array of complex objects with two criteria "test1" and "field.test2"
```js
const objectComparator = require('objectComparator');

let complexArray = [
  {test1:4, field:{test2:2}},
  {test1:1, field:{test2:1}},
  {test1:2, field:{test2:1}},
  {test1:3, field:{test2:3}},
  {test1:5, field:{test2:1}},
  {test1:3, field:{test2:1}},
  {test1:4, field:{test2:3}},
  {test1:5, field:{test2:3}},
  {test1:2, field:{test2:3}},
  {test1:5, field:{test2:2}},
  {test1:3, field:{test2:2}},
  {test1:1, field:{test2:3}},
  {test1:2, field:{test2:2}},
  {test1:4, field:{test2:1}},
  {test1:1, field:{test2:2}},
];

complexArray.sort(objectComparator( [{field:"test1",direction:1}, {field:"field.test2",direction:1}] )); //sort with test1 going forwards, test2 going forwards
complexArray.sort(objectComparator( [{field:"test1",direction:1}, {field:"field.test2",direction:-1}] )); //sort with test1 going forwards, test2 going backwards
complexArray.sort(objectComparator( [{field:"test1",direction:-1}, {field:"field.test2",direction:1}] )); //sort with test1 going backwards, test2 going forwards
complexArray.sort(objectComparator( [{field:"test1",direction:-1}, {field:"field.test2",direction:-1}] )); //sort with test1 going backwards, test2 going backwards
```
