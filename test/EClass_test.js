var assert = require('assert');

var EClassMetaData = require('../routes/eClass/eClassMetaData.js');

describe('EClassMetaData', function() {
	describe('#isCardinality', function() {
		it('should find cardinality-property', function() {
			assert.equal( EClassMetaData.isCardinality("AAN542"), true );
		});

		it('should not find none-cardinality-property', function() {
			assert.equal( EClassMetaData.isCardinality('AAS348'), false );
		});
	});

	describe('#getBlockIdentifers', function() {
		it('should find one block property from cardinality-property', function() {
			var blockId = EClassMetaData.getBlockIdentifers('AAM631');
			assert.deepEqual( blockId, ['AAQ378']);
		});

		it('should find multiple block property from cardinality-property (at the end of the list)', function() {
			var blockIds = EClassMetaData.getBlockIdentifers('AAT604');
			assert.deepEqual( blockIds, ['AAT605', 'AAT978','AAU404', 'AAU419']);
		});

		it('should not find block property from none cardinality-property', function() {
			var blockId = EClassMetaData.getBlockIdentifers('AAM637');
			assert.deepEqual( blockId, []);
		});
	});

	describe('#isBlockFeature', function() {
		it('should find block property', function() {
			assert.equal( EClassMetaData.isBlockFeature('AAQ381'), true);
		});

		it('should find block property (at the end of the list)', function() {
			assert.equal( EClassMetaData.isBlockFeature('AAU429'), true);
		});

		it('should not find none block property', function() {
			assert.equal( EClassMetaData.isBlockFeature('AAQ177'), false);
		});

	});


});