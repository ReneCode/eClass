// EClassLevel_test

var assert = require('assert');
var EClassLevel = require('../routes/eClass/eClassLevel.js');

describe('EClassLevel', function() {
	it('should work on same level', function() {
		var level = new EClassLevel();

		level.setFeature( { id:4, parentId:-1 });
		level.setFeature( { id:5, parentId:-1 });
		assert.deepEqual([2], level.asArray());
	});

	it('should work on indent level', function() {
		var level = new EClassLevel();

		level.setFeature( { id:4, parentId:-1 });
		level.setFeature( { id:5, parentId:4 });
		level.setFeature( { id:6, parentId:4 });
		assert.deepEqual([1,2], level.asArray());
	});

	it('should work on re-indent level', function() {
		var level = new EClassLevel();

		level.setFeature( { id:4, parentId:-1 });
		level.setFeature( { id:5, parentId:4 });
		level.setFeature( { id:6, parentId:4 });
		level.setFeature( { id:7, parentId:-1 });
		assert.deepEqual([2], level.asArray());
	});


	it('should work on complex level 1', function() {
		var level = new EClassLevel();

		level.setFeature( { id:4, parentId:-1 });
		level.setFeature( { id:5, parentId:4 });
		level.setFeature( { id:6, parentId:4 });
		level.setFeature( { id:7, parentId:-1 });
		level.setFeature( { id:8, parentId:7 });
		assert.deepEqual([2,1], level.asArray());
	});

	it('should work on complex level 2', function() {
		var level = new EClassLevel();
		level.setFeature( { id:4, parentId:-1 });
		level.setFeature( { id:5, parentId:4 });
		level.setFeature( { id:6, parentId:5 });
		level.setFeature( { id:7, parentId:6 });
		level.setFeature( { id:8, parentId:6 });
		assert.deepEqual([1,1,1,2], level.asArray());
	});

	it('should work on complex level, re-indent', function() {
		var level = new EClassLevel();
		level.setFeature( { id:4, parentId:-1 });
		level.setFeature( { id:5, parentId:4 });
		level.setFeature( { id:6, parentId:5 });
		level.setFeature( { id:7, parentId:6 });
		level.setFeature( { id:8, parentId:6 });
		level.setFeature( { id:9, parentId:4 });
		level.setFeature( { id:10, parentId:9 });
		assert.deepEqual([1,2,1], level.asArray());
	});


});


