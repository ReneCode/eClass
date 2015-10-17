var assert = require('assert');
var Stack = require('../routes/eClass/Stack.js');
var clone = require('clone');

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

	describe('#asArray', function() {
		it('should return empty array on new stack', function() {
			var s = new Stack();
			var l = s.asArray();
			assert.deepEqual([], l);
		});

		it('should return list in right order', function() {
			var s = new Stack();
			s.push('a');
			s.push(42);
			s.push('x')
			assert.deepEqual(['a', 42, 'x'], s.asArray());
		});

		it('should return list joined as string', function() {
			var s = new Stack();
			s.push(5);
			s.push(6);
			s.push(8);
			assert.equal('5.6.8', s.asArray().join('.'));
		});
	});

	describe('#incTop', function() {
		it('should increment the top value', function() {
			var s = new Stack();
			s.push(1);
			s.push(2);
			s.incTop();
			s.push(10);
			s.incTop();
			assert.equal('1.3.11', s.asArray().join('.'));
		});
	});

	describe('copy of Stack', function() {
		it('should be independent', function() {
			var s1 = new Stack();
			s1.push('a');
			var s2 = clone(s1);
			s2.push('b');
			assert.deepEqual(['a'], s1.asArray());
			assert.deepEqual(['a','b'], s2.asArray());
		});
	});

	describe('#count', function() {
		it('should return the count of elements', function() {
			var s = new Stack();
			s.push('x');
			s.push('y');
			s.push('z');
			assert.equal(3, s.count());
		});
	});

	describe('#contains', function() {
		it('should return true if it contains the given Stack', function() {
			var s1 = new Stack();
			s1.push(3);
			s1.push(5);
			s1.push(7);
			var s2 = new Stack();
			s2.push(3);
			s2.push(5);
			assert.equal(true, s1.contains(s2));
		});

		it('should return false if it does not contains', function() {
			var s1 = new Stack();
			s1.push(3);
			s1.push(4);
			s1.push(7);
			var s2 = new Stack();
			s2.push(3);
			s2.push(5);
			assert.equal(false, s1.contains(s2));
		});

		it('should return false if stack is too small', function() {
			var s1 = new Stack();
			s1.push(3);
			s1.push(5);
			var s2 = new Stack();
			s2.push(3);
			s2.push(5);
			s2.push(7);
			assert.equal(false, s1.contains(s2));
		});

	});  // contains

	describe('#equal', function() {
		it('should be equal on two identical stacks', function() {
			var s1 = new Stack();
			s1.push(3);
			s1.push(5);
			var s2 = new Stack();
			s2.push(3);
			s2.push(5);
			assert.equal(true, s1.equal(s2));
		});

		it('should be not equal on two different stacks', function() {
			var s1 = new Stack();
			s1.push(3);
			s1.push(57);
			var s2 = new Stack();
			s2.push(3);
			s2.push(5);
			assert.equal(false, s1.equal(s2));
		});
	}); // equal


});

