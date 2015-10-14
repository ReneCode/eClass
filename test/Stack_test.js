var assert = require('assert');
var Stack = require('../routes/eClass/Stack.js');

describe('Stack', function() {
	describe('#push', function() {
		it ('should return top value', function() {
			var s = new Stack();
			s.push(4);
			s.push(55);
			assert.equal(s.top(), 55);
		});
	});

	describe('#isEmpty', function() {
		it('should return false on filled stack', function() {
			var s = new Stack();
			s.push('x');
			s.push('y');
			assert.equal(s.isEmpty(), false);
		});

		it('should return true on empty stack', function() {
			var s = new Stack();
			assert.equal(s.isEmpty(), true);
		});

		it('should return true on all-pop-ed stack', function() {
			var s = new Stack();
			s.push('x');
			s.push('y');
			s.pop();
			s.pop();
			assert.equal(s.isEmpty(), true);
		});
	});

	describe('#pop', function() {
		it ('should remove the top level', function() {
			var s = new Stack();
			s.push('a');
			s.push('b');
			s.push('c');
			s.pop();
			assert(s.top() == 'b');
		});

		it ('should return undefined on empty stack', function() {
			var s = new Stack();
			assert.equal(s.top(), undefined);
		});

		it ('should return undefined on over-pop-ed stack', function() {
			var s = new Stack();
			s.push('a');
			s.push('b');
			s.pop();
			s.pop();
			s.pop();
			s.pop();
			assert.equal(s.top(), undefined);
		});
	});

	describe('#asList', function() {
		it('should return empty array on new stack', function() {
			var s = new Stack();
			var l = s.asList();
			assert.deepEqual([], l);
		});

		it('should return list in right order', function() {
			var s = new Stack();
			s.push('a');
			s.push(42);
			s.push('x')
			assert.deepEqual(['a', 42, 'x'], s.asList());
		});

		it('should return list joined as string', function() {
			var s = new Stack();
			s.push(5);
			s.push(6);
			s.push(8);
			assert.equal('5.6.8', s.asList().join('.'));
		});

	});

})