'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _actionTypes = require('../actionTypes');

var _actions = require('../actions');

describe('actions', function () {
  it('should create add array value action', function () {
    _expect2['default'](_actions.addArrayValue('foo', undefined, 1)).toEqual({
      type: _actionTypes.ADD_ARRAY_VALUE,
      path: 'foo',
      index: 1,
      value: undefined
    });
    _expect2['default'](_actions.addArrayValue('bar.baz')).toEqual({
      type: _actionTypes.ADD_ARRAY_VALUE,
      path: 'bar.baz',
      index: undefined,
      value: undefined
    });
    _expect2['default'](_actions.addArrayValue('bar.baz', 'foo', 2)).toEqual({
      type: _actionTypes.ADD_ARRAY_VALUE,
      path: 'bar.baz',
      index: 2,
      value: 'foo'
    });
  });

  it('should create blur action', function () {
    _expect2['default'](_actions.blur('foo', 'bar')).toEqual({
      type: _actionTypes.BLUR,
      field: 'foo',
      value: 'bar'
    });
    _expect2['default'](_actions.blur('baz', 7)).toEqual({
      type: _actionTypes.BLUR,
      field: 'baz',
      value: 7
    });
  });

  it('should create change action', function () {
    _expect2['default'](_actions.change('foo', 'bar')).toEqual({
      type: _actionTypes.CHANGE,
      field: 'foo',
      value: 'bar'
    });
    _expect2['default'](_actions.change('baz', 7)).toEqual({
      type: _actionTypes.CHANGE,
      field: 'baz',
      value: 7
    });
  });

  it('should create focus action', function () {
    _expect2['default'](_actions.focus('foo')).toEqual({
      type: _actionTypes.FOCUS,
      field: 'foo'
    });
  });

  it('should create initialize action', function () {
    var data = { a: 8, c: 9 };
    var fields = ['a', 'c'];
    _expect2['default'](_actions.initialize(data, fields)).toEqual({ type: _actionTypes.INITIALIZE, data: data, fields: fields });
  });

  it('should throw an error if initialize is not given a fields array', function () {
    _expect2['default'](function () {
      return _actions.initialize({ a: 1, b: 2 }, undefined);
    }).toThrow(/must provide fields array/);
    _expect2['default'](function () {
      return _actions.initialize({ a: 1, b: 2 }, 'not an array');
    }).toThrow(/must provide fields array/);
    _expect2['default'](function () {
      return _actions.initialize({ a: 1, b: 2 }, { also: 'not an array' });
    }).toThrow(/must provide fields array/);
  });

  it('should create remove array value action', function () {
    _expect2['default'](_actions.removeArrayValue('foo', 3)).toEqual({
      type: _actionTypes.REMOVE_ARRAY_VALUE,
      path: 'foo',
      index: 3
    });
    _expect2['default'](_actions.removeArrayValue('bar.baz')).toEqual({
      type: _actionTypes.REMOVE_ARRAY_VALUE,
      path: 'bar.baz',
      index: undefined
    });
  });

  it('should create reset action', function () {
    _expect2['default'](_actions.reset()).toEqual({ type: _actionTypes.RESET });
  });

  it('should create destroy action', function () {
    _expect2['default'](_actions.destroy()).toEqual({ type: _actionTypes.DESTROY });
  });

  it('should create startAsyncValidation action', function () {
    _expect2['default'](_actions.startAsyncValidation('myField')).toEqual({
      type: _actionTypes.START_ASYNC_VALIDATION,
      field: 'myField'
    });
  });

  it('should create startSubmit action', function () {
    _expect2['default'](_actions.startSubmit()).toEqual({ type: _actionTypes.START_SUBMIT });
  });

  it('should create stopAsyncValidation action', function () {
    var errors = {
      foo: 'Foo error',
      bar: 'Error for bar'
    };
    _expect2['default'](_actions.stopAsyncValidation(errors)).toEqual({
      type: _actionTypes.STOP_ASYNC_VALIDATION,
      errors: errors
    });
  });

  it('should create stopSubmit action', function () {
    _expect2['default'](_actions.stopSubmit()).toEqual({
      type: _actionTypes.STOP_SUBMIT,
      errors: undefined
    });
    var errors = {
      foo: 'Foo error',
      bar: 'Error for bar'
    };
    _expect2['default'](_actions.stopSubmit(errors)).toEqual({
      type: _actionTypes.STOP_SUBMIT,
      errors: errors
    });
  });

  it('should create swap array value action', function () {
    _expect2['default'](_actions.swapArrayValues('foo', 3, 6)).toEqual({
      type: _actionTypes.SWAP_ARRAY_VALUES,
      path: 'foo',
      indexA: 3,
      indexB: 6
    });
    _expect2['default'](_actions.swapArrayValues('foo', 3)).toEqual({
      type: _actionTypes.SWAP_ARRAY_VALUES,
      path: 'foo',
      indexA: 3,
      indexB: undefined
    });
    _expect2['default'](_actions.swapArrayValues('bar.baz')).toEqual({
      type: _actionTypes.SWAP_ARRAY_VALUES,
      path: 'bar.baz',
      indexA: undefined,
      indexB: undefined
    });
  });

  it('should create touch action', function () {
    _expect2['default'](_actions.touch('foo', 'bar')).toEqual({
      type: _actionTypes.TOUCH,
      fields: ['foo', 'bar']
    });
    _expect2['default'](_actions.touch('cat', 'dog', 'pig')).toEqual({
      type: _actionTypes.TOUCH,
      fields: ['cat', 'dog', 'pig']
    });
  });

  it('should create untouch action', function () {
    _expect2['default'](_actions.untouch('foo', 'bar')).toEqual({
      type: _actionTypes.UNTOUCH,
      fields: ['foo', 'bar']
    });
    _expect2['default'](_actions.untouch('cat', 'dog', 'pig')).toEqual({
      type: _actionTypes.UNTOUCH,
      fields: ['cat', 'dog', 'pig']
    });
  });
});