'use strict';

const expect = require('chai').expect;
const comparator = require('../index');

const minVal = 0;
const maxVal = 99999;

let simpleArray = [
  {test: 2},
  {test: 1},
  {test: 3},
  {test: 4},
  {test: 5},
];

let nestedArray = [
  {field: {test: 3}},
  {field: {test: 2}},
  {field: {test: 5}},
  {field: {test: 4}},
  {field: {test: 1}},
];

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

describe('#comparators', function() {
  it('should sort an array', function() {
    let arr = JSON.parse(JSON.stringify(simpleArray));

    arr.sort(comparator([{field:"test",direction:1}]));

    let val = minVal;
    for(let i=0; i<arr.length; ++i) {
      expect(arr[i].test > val).to.equal(true);
      val = arr[i].test;
    }
  });



  it('should sort an array backwards', function() {
    let arr = JSON.parse(JSON.stringify(simpleArray));

    arr.sort(comparator([{field:"test",direction:-1}]));

    let val = maxVal;
    for(let i=0; i<arr.length; ++i) {
      expect(arr[i].test < val).to.equal(true);
      val = arr[i].test;
    }
  });






  it('should sort a nested array', function() {
    let arr = JSON.parse(JSON.stringify(nestedArray));

    arr.sort(comparator([{field:"field.test",direction:1}]));

    let val = minVal;
    for(let i=0; i<arr.length; ++i) {
      expect(arr[i].field.test > val).to.equal(true);
      val = arr[i].field.test;
    }
  });



  it('should sort a nested array backwards', function() {
    let arr = JSON.parse(JSON.stringify(nestedArray));

    arr.sort(comparator([{field:"field.test",direction:-1}]));

    let val = maxVal;
    for(let i=0; i<arr.length; ++i) {
      expect(arr[i].field.test < val).to.equal(true);
      val = arr[i].field.test;
    }
  });



  it('should sort a complex array test1 forwards, test2 forwards', function() {
    let arr = JSON.parse(JSON.stringify(complexArray));

    arr.sort(comparator([{field:"test1",direction:1}, {field:"field.test2",direction:1}]));

    let test1Val = minVal;
    let test2Val = minVal;
    for(let i=0; i<arr.length; ++i) {
      //if test1 values are equal, check test2 is in order
      if(arr[i].test1 === test1Val) {
        expect(arr[i].field.test2 > test2Val).to.equal(true);
      }
      else {
        expect(arr[i].test1 > test1Val).to.equal(true);

      }
      test1Val = arr[i].test1;
      test2Val = arr[i].field.test2;
    }
  });



  it('should sort a complex array test1 forwards, test2 backwards', function() {
    let arr = JSON.parse(JSON.stringify(complexArray));

    arr.sort(comparator([{field:"test1",direction:1}, {field:"field.test2",direction:-1}]));

    let test1Val = minVal;
    let test2Val = maxVal;
    for(let i=0; i<arr.length; ++i) {
      //if test1 values are equal, check test2 is in order
      if(arr[i].test1 === test1Val) {
        expect(arr[i].field.test2 < test2Val).to.equal(true);
      }
      else {
        expect(arr[i].test1 > test1Val).to.equal(true);

      }
      test1Val = arr[i].test1;
      test2Val = arr[i].field.test2;
    }
  });



  it('should sort a complex array test1 backwards, test2 forwards', function() {
    let arr = JSON.parse(JSON.stringify(complexArray));

    arr.sort(comparator([{field:"test1",direction:-1}, {field:"field.test2",direction:1}]));

    let test1Val = maxVal;
    let test2Val = minVal;
    for(let i=0; i<arr.length; ++i) {
      //if test1 values are equal, check test2 is in order
      if(arr[i].test1 === test1Val) {
        expect(arr[i].field.test2 > test2Val).to.equal(true);
      }
      else {
        expect(arr[i].test1 < test1Val).to.equal(true);

      }
      test1Val = arr[i].test1;
      test2Val = arr[i].field.test2;
    }
  });



  it('should sort a complex array test1 backwards, test2 backwards', function() {
    let arr = JSON.parse(JSON.stringify(complexArray));

    arr.sort(comparator([{field:"test1",direction:-1}, {field:"field.test2",direction:-1}]));

    let test1Val = maxVal;
    let test2Val = maxVal;
    for(let i=0; i<arr.length; ++i) {
      //if test1 values are equal, check test2 is in order
      if(arr[i].test1 === test1Val) {
        expect(arr[i].field.test2 < test2Val).to.equal(true);
      }
      else {
        expect(arr[i].test1 < test1Val).to.equal(true);

      }
      test1Val = arr[i].test1;
      test2Val = arr[i].field.test2;
    }
  });
});
