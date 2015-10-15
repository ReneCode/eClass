var assert = require('assert');

var EClassMetaData = require('../routes/eClass/eClassMetaData.js');

describe('EClassMetaData', function() {
	describe('#isCardinality', function() {
		it('should find cardinality-property', function() {
			assert.equal( EClassMetaData.isCardinality("AAO329"), true );
		});

		it('should not find none-cardinality-property', function() {
			assert.equal( EClassMetaData.isCardinality('AAS348'), false );
		});
	});

	describe('#getBlockIdentifer', function() {
		it('should find block property from cardinality-property', function() {
			var blockId = EClassMetaData.getBlockIdentifer('AAM631');
			assert.equal( blockId, 'AAQ378');
		});

		it('should not find block property from none cardinality-property', function() {
			var blockId = EClassMetaData.getBlockIdentifer('AAM637');
			assert.equal( blockId, undefined);
		});
	});

	describe('#isBlockIdentifer', function() {
		it('should find block property', function() {
			assert.equal( EClassMetaData.isBlockIdentifer('AAQ381'), true);
		});

		it('should not find none block property', function() {
			assert.equal( EClassMetaData.isBlockIdentifer('AAQ177'), false);
		});

	});


});