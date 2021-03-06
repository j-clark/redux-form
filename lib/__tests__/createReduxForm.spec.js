/* eslint react/no-multi-comp:0 */
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _redux = require('redux');

var _reducer = require('../reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _createReduxForm = require('../createReduxForm');

var _createReduxForm2 = _interopRequireDefault(_createReduxForm);

var createRestorableSpy = function createRestorableSpy(fn) {
  return _expect.createSpy(fn, function restore() {
    this.calls = [];
  });
};

describe('createReduxForm', function () {
  var reduxForm = _createReduxForm2['default'](false, _react2['default'], _reactRedux.connect);
  var makeStore = function makeStore() {
    return _redux.createStore(_redux.combineReducers({
      form: _reducer2['default']
    }));
  };

  it('should return a decorator function', function () {
    _expect2['default'](reduxForm).toBeA('function');
  });

  var Form = (function (_Component) {
    _inherits(Form, _Component);

    function Form() {
      _classCallCheck(this, Form);

      _Component.apply(this, arguments);
    }

    Form.prototype.render = function render() {
      return _react2['default'].createElement('div', null);
    };

    return Form;
  })(_react.Component);

  var expectField = function expectField(_ref) {
    var field = _ref.field;
    var name = _ref.name;
    var value = _ref.value;
    var initial = _ref.initial;
    var valid = _ref.valid;
    var dirty = _ref.dirty;
    var error = _ref.error;
    var touched = _ref.touched;
    var visited = _ref.visited;
    var readonly = _ref.readonly;

    _expect2['default'](field).toBeA('object');
    _expect2['default'](field.name).toBe(name);
    _expect2['default'](field.value).toEqual(value);
    if (readonly) {
      _expect2['default'](field.onBlur).toNotExist();
      _expect2['default'](field.onChange).toNotExist();
      _expect2['default'](field.onDragStart).toNotExist();
      _expect2['default'](field.onDrop).toNotExist();
      _expect2['default'](field.onFocus).toNotExist();
      _expect2['default'](field.onUpdate).toNotExist();
    } else {
      _expect2['default'](field.onBlur).toBeA('function');
      _expect2['default'](field.onChange).toBeA('function');
      _expect2['default'](field.onDragStart).toBeA('function');
      _expect2['default'](field.onDrop).toBeA('function');
      _expect2['default'](field.onFocus).toBeA('function');
      _expect2['default'](field.onUpdate).toBeA('function');
    }
    _expect2['default'](field.initialValue).toEqual(initial);
    _expect2['default'](field.defaultValue).toEqual(initial);
    _expect2['default'](field.defaultChecked).toBe(initial === true);
    _expect2['default'](field.valid).toBe(valid);
    _expect2['default'](field.invalid).toBe(!valid);
    _expect2['default'](field.dirty).toBe(dirty);
    _expect2['default'](field.pristine).toBe(!dirty);
    _expect2['default'](field.error).toEqual(error);
    _expect2['default'](field.touched).toBe(touched);
    _expect2['default'](field.visited).toBe(visited);
  };

  it('should render without error', function () {
    var store = makeStore();
    _expect2['default'](function () {
      var Decorated = reduxForm({
        form: 'testForm',
        fields: ['foo', 'bar']
      })(Form);
      _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
        _reactRedux.Provider,
        { store: store },
        _react2['default'].createElement(Decorated, null)
      ));
    }).toNotThrow();
  });

  it('should pass fields as props', function () {
    var store = makeStore();
    var Decorated = reduxForm({
      form: 'testForm',
      fields: ['foo', 'bar']
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, null)
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);
    _expect2['default'](stub.props.fields).toBeA('object');
    expectField({
      field: stub.props.fields.foo,
      name: 'foo',
      value: undefined,
      initial: undefined,
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false,
      readonly: false
    });
    expectField({
      field: stub.props.fields.bar,
      name: 'bar',
      value: undefined,
      initial: undefined,
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false,
      readonly: false
    });
  });

  it('should initialize field values', function () {
    var store = makeStore();
    var Decorated = reduxForm({
      form: 'testForm',
      fields: ['foo', 'bar']
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, { initialValues: { foo: 'fooValue', bar: 'barValue' } })
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);
    _expect2['default'](stub.props.fields).toBeA('object');
    expectField({
      field: stub.props.fields.foo,
      name: 'foo',
      value: 'fooValue',
      initial: 'fooValue',
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false,
      readonly: false
    });
    expectField({
      field: stub.props.fields.bar,
      name: 'bar',
      value: 'barValue',
      initial: 'barValue',
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false,
      readonly: false
    });
  });

  it('should set value and touch field on blur', function () {
    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['foo', 'bar']
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, null)
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);

    stub.props.fields.foo.onBlur('fooValue');

    _expect2['default'](stub.props.fields).toBeA('object');
    expectField({
      field: stub.props.fields.foo,
      name: 'foo',
      value: 'fooValue',
      initial: undefined,
      valid: true,
      dirty: true,
      error: undefined,
      touched: true,
      visited: false,
      readonly: false
    });
    expectField({
      field: stub.props.fields.bar,
      name: 'bar',
      value: undefined,
      initial: undefined,
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false,
      readonly: false
    });
  });

  it('should set value and NOT touch field on blur if touchOnBlur is disabled', function () {
    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['foo', 'bar'],
      touchOnBlur: false
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, null)
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);

    stub.props.fields.foo.onBlur('fooValue');

    _expect2['default'](stub.props.fields).toBeA('object');
    expectField({
      field: stub.props.fields.foo,
      name: 'foo',
      value: 'fooValue',
      initial: undefined,
      valid: true,
      dirty: true,
      error: undefined,
      touched: false,
      visited: false,
      readonly: false
    });
    expectField({
      field: stub.props.fields.bar,
      name: 'bar',
      value: undefined,
      initial: undefined,
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false,
      readonly: false
    });
  });

  it('should set value and NOT touch field on change', function () {
    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['foo', 'bar']
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, null)
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);

    stub.props.fields.foo.onChange('fooValue');

    _expect2['default'](stub.props.fields).toBeA('object');
    expectField({
      field: stub.props.fields.foo,
      name: 'foo',
      value: 'fooValue',
      initial: undefined,
      valid: true,
      dirty: true,
      error: undefined,
      touched: false,
      visited: false,
      readonly: false
    });
    expectField({
      field: stub.props.fields.bar,
      name: 'bar',
      value: undefined,
      initial: undefined,
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false,
      readonly: false
    });
  });

  it('should set value and touch field on change if touchOnChange is enabled', function () {
    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['foo', 'bar'],
      touchOnChange: true
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, null)
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);

    stub.props.fields.foo.onChange('fooValue');

    _expect2['default'](stub.props.fields).toBeA('object');
    expectField({
      field: stub.props.fields.foo,
      name: 'foo',
      value: 'fooValue',
      initial: undefined,
      valid: true,
      dirty: true,
      error: undefined,
      touched: true,
      visited: false,
      readonly: false
    });
    expectField({
      field: stub.props.fields.bar,
      name: 'bar',
      value: undefined,
      initial: undefined,
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false,
      readonly: false
    });
  });

  it('should set visited field on focus', function () {
    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['foo', 'bar']
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, null)
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);

    _expect2['default'](stub.props.active).toBe(undefined);

    stub.props.fields.foo.onFocus();

    _expect2['default'](stub.props.active).toBe('foo');

    _expect2['default'](stub.props.fields).toBeA('object');
    expectField({
      field: stub.props.fields.foo,
      name: 'foo',
      value: undefined,
      initial: undefined,
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: true,
      readonly: false
    });
    expectField({
      field: stub.props.fields.bar,
      name: 'bar',
      value: undefined,
      initial: undefined,
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false,
      readonly: false
    });
  });

  it('should set dirty when field changes', function () {
    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['foo', 'bar']
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, { initialValues: { foo: 'fooValue', bar: 'barValue' } })
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);

    expectField({
      field: stub.props.fields.foo,
      name: 'foo',
      value: 'fooValue',
      initial: 'fooValue',
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false,
      readonly: false
    });

    stub.props.fields.foo.onChange('fooValue!');

    expectField({
      field: stub.props.fields.foo,
      name: 'foo',
      value: 'fooValue!',
      initial: 'fooValue',
      valid: true,
      dirty: true,
      error: undefined,
      touched: false,
      visited: false,
      readonly: false
    });
  });

  it('should set dirty when and array field changes', function () {
    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['children[].name']
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, { initialValues: { children: [{ name: 'Tom' }, { name: 'Jerry' }] } })
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);
    _expect2['default'](stub.props.fields.children).toBeA('array');
    _expect2['default'](stub.props.fields.children.length).toBe(2);

    expectField({
      field: stub.props.fields.children[0].name,
      name: 'children[0].name',
      value: 'Tom',
      initial: 'Tom',
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false,
      readonly: false
    });
    expectField({
      field: stub.props.fields.children[1].name,
      name: 'children[1].name',
      value: 'Jerry',
      initial: 'Jerry',
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false,
      readonly: false
    });

    stub.props.fields.children[0].name.onChange('Tim');

    expectField({
      field: stub.props.fields.children[0].name,
      name: 'children[0].name',
      value: 'Tim',
      initial: 'Tom',
      valid: true,
      dirty: true,
      error: undefined,
      touched: false,
      visited: false,
      readonly: false
    });
    expectField({
      field: stub.props.fields.children[1].name,
      name: 'children[1].name',
      value: 'Jerry',
      initial: 'Jerry',
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false,
      readonly: false
    });
  });

  it('should trigger sync error on change that invalidates value', function () {
    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['foo', 'bar'],
      validate: function validate(values) {
        var errors = {};
        if (values.foo && values.foo.length > 8) {
          errors.foo = 'Too long';
        }
        if (!values.bar) {
          errors.bar = 'Required';
        }
        return errors;
      }
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, { initialValues: { foo: 'fooValue', bar: 'barValue' } })
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);

    expectField({
      field: stub.props.fields.foo,
      name: 'foo',
      value: 'fooValue',
      initial: 'fooValue',
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false,
      readonly: false
    });

    expectField({
      field: stub.props.fields.bar,
      name: 'bar',
      value: 'barValue',
      initial: 'barValue',
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false,
      readonly: false
    });
    _expect2['default'](stub.props.valid).toBe(true);
    _expect2['default'](stub.props.invalid).toBe(false);
    _expect2['default'](stub.props.errors).toEqual({});

    stub.props.fields.foo.onChange('fooValue!');

    expectField({
      field: stub.props.fields.foo,
      name: 'foo',
      value: 'fooValue!',
      initial: 'fooValue',
      valid: false,
      dirty: true,
      error: 'Too long',
      touched: false,
      visited: false,
      readonly: false
    });

    stub.props.fields.bar.onChange('');

    expectField({
      field: stub.props.fields.bar,
      name: 'bar',
      value: '',
      initial: 'barValue',
      valid: false,
      dirty: true,
      error: 'Required',
      touched: false,
      visited: false,
      readonly: false
    });

    _expect2['default'](stub.props.valid).toBe(false);
    _expect2['default'](stub.props.invalid).toBe(true);
    _expect2['default'](stub.props.errors).toEqual({
      foo: 'Too long',
      bar: 'Required'
    });
  });

  it('should trigger sync error on change that invalidates nested value', function () {
    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['foo.bar'],
      validate: function validate(values) {
        var errors = {};
        if (values.foo.bar && values.foo.bar.length > 8) {
          errors.foo = { bar: 'Too long' };
        }
        return errors;
      }
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, { initialValues: { foo: { bar: 'fooBar' } } })
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);

    expectField({
      field: stub.props.fields.foo.bar,
      name: 'foo.bar',
      value: 'fooBar',
      initial: 'fooBar',
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false,
      readonly: false
    });
    _expect2['default'](stub.props.valid).toBe(true);
    _expect2['default'](stub.props.invalid).toBe(false);
    _expect2['default'](stub.props.errors).toEqual({});

    stub.props.fields.foo.bar.onChange('fooBarBaz');

    expectField({
      field: stub.props.fields.foo.bar,
      name: 'foo.bar',
      value: 'fooBarBaz',
      initial: 'fooBar',
      valid: false,
      dirty: true,
      error: 'Too long',
      touched: false,
      visited: false,
      readonly: false
    });

    _expect2['default'](stub.props.valid).toBe(false);
    _expect2['default'](stub.props.invalid).toBe(true);
    _expect2['default'](stub.props.errors).toEqual({
      foo: {
        bar: 'Too long'
      }
    });
  });

  it('should trigger sync error on change that invalidates array value', function () {
    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['foo[]', 'bar[].name'],
      validate: function validate(values) {
        var errors = {};
        if (values.foo && values.foo.length && values.foo[0] && values.foo[0].length > 8) {
          errors.foo = ['Too long'];
        }
        if (values.bar && values.bar.length && values.bar[0] && values.bar[0].name === 'Ralphie') {
          errors.bar = [{ name: 'You\'ll shoot your eye out, kid!' }];
        }
        return errors;
      }
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, { initialValues: { foo: ['fooBar'], bar: [{ name: '' }] } })
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);

    expectField({
      field: stub.props.fields.foo[0],
      name: 'foo[0]',
      value: 'fooBar',
      initial: 'fooBar',
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false,
      readonly: false
    });

    expectField({
      field: stub.props.fields.bar[0].name,
      name: 'bar[0].name',
      value: '',
      initial: '',
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false,
      readonly: false
    });
    _expect2['default'](stub.props.valid).toBe(true);
    _expect2['default'](stub.props.invalid).toBe(false);
    _expect2['default'](stub.props.errors).toEqual({});

    stub.props.fields.foo[0].onChange('fooBarBaz');

    expectField({
      field: stub.props.fields.foo[0],
      name: 'foo[0]',
      value: 'fooBarBaz',
      initial: 'fooBar',
      valid: false,
      dirty: true,
      error: 'Too long',
      touched: false,
      visited: false,
      readonly: false
    });

    stub.props.fields.bar[0].name.onChange('Ralphie');

    expectField({
      field: stub.props.fields.bar[0].name,
      name: 'bar[0].name',
      value: 'Ralphie',
      initial: '',
      valid: false,
      dirty: true,
      error: 'You\'ll shoot your eye out, kid!',
      touched: false,
      visited: false,
      readonly: false
    });

    _expect2['default'](stub.props.valid).toBe(false);
    _expect2['default'](stub.props.invalid).toBe(true);
    _expect2['default'](stub.props.errors).toEqual({
      foo: ['Too long'],
      bar: [{ name: 'You\'ll shoot your eye out, kid!' }]
    });
  });

  it('should call destroy on unmount', function () {
    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['foo', 'bar']
    })(Form);

    var div = document.createElement('div');
    _reactDom2['default'].render(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, { initialValues: { foo: 'fooValue', bar: 'barValue' } })
    ), div);
    var before = store.getState();
    _expect2['default'](before.form).toBeA('object');
    _expect2['default'](before.form[form]).toBeA('object');
    _expect2['default'](before.form[form].foo).toBeA('object');
    _expect2['default'](before.form[form].bar).toBeA('object');

    _reactDom2['default'].unmountComponentAtNode(div);

    var after = store.getState();
    _expect2['default'](after.form).toBeA('object');
    _expect2['default'](after.form[form]).toNotExist();
  });

  it('should NOT call destroy on unmount if destroyOnUnmount is disabled', function () {
    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['foo', 'bar'],
      destroyOnUnmount: false
    })(Form);

    var div = document.createElement('div');
    _reactDom2['default'].render(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, { initialValues: { foo: 'fooValue', bar: 'barValue' } })
    ), div);
    var before = store.getState();
    _expect2['default'](before.form).toBeA('object');
    _expect2['default'](before.form[form]).toBeA('object');
    _expect2['default'](before.form[form].foo).toBeA('object');
    _expect2['default'](before.form[form].bar).toBeA('object');

    _reactDom2['default'].unmountComponentAtNode(div);

    var after = store.getState();
    _expect2['default'](after.form).toBeA('object');
    _expect2['default'](after.form[form]).toBeA('object');
    _expect2['default'](after.form[form].foo).toBeA('object');
    _expect2['default'](after.form[form].bar).toBeA('object');
  });

  it('should hoist statics', function () {
    var FormWithStatics = (function (_Component2) {
      _inherits(FormWithStatics, _Component2);

      function FormWithStatics() {
        _classCallCheck(this, FormWithStatics);

        _Component2.apply(this, arguments);
      }

      FormWithStatics.prototype.render = function render() {
        return _react2['default'].createElement('div', null);
      };

      return FormWithStatics;
    })(_react.Component);

    FormWithStatics.someStatic1 = 'cat';
    FormWithStatics.someStatic2 = 42;

    var Decorated = reduxForm({
      form: 'testForm',
      fields: ['foo', 'bar']
    })(FormWithStatics);

    _expect2['default'](Decorated.someStatic1).toBe('cat');
    _expect2['default'](Decorated.someStatic2).toBe(42);
  });

  it('should not provide mutators when readonly', function () {
    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['foo', 'bar'],
      readonly: true
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, null)
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);

    expectField({
      field: stub.props.fields.foo,
      name: 'foo',
      value: undefined,
      initial: undefined,
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false,
      readonly: true
    });

    expectField({
      field: stub.props.fields.bar,
      name: 'bar',
      value: undefined,
      initial: undefined,
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false,
      readonly: true
    });
  });

  it('should initialize an array field', function () {
    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['children[].name'],
      initialValues: {
        children: [{ name: 'Tom' }, { name: 'Jerry' }]
      }
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, null)
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);

    expectField({
      field: stub.props.fields.children[0].name,
      name: 'children[0].name',
      value: 'Tom',
      initial: 'Tom',
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false
    });

    expectField({
      field: stub.props.fields.children[1].name,
      name: 'children[1].name',
      value: 'Jerry',
      initial: 'Jerry',
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false
    });
  });

  it('should call onSubmit prop', function (done) {
    var submit = function submit(values) {
      _expect2['default'](values).toEqual({
        foo: undefined,
        bar: undefined
      });
      done();
    };

    var FormComponent = (function (_Component3) {
      _inherits(FormComponent, _Component3);

      function FormComponent() {
        _classCallCheck(this, FormComponent);

        _Component3.apply(this, arguments);
      }

      FormComponent.prototype.render = function render() {
        return _react2['default'].createElement('form', { onSubmit: this.props.handleSubmit });
      };

      return FormComponent;
    })(_react.Component);

    FormComponent.propTypes = {
      handleSubmit: _react.PropTypes.func.isRequired
    };

    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['foo', 'bar'],
      readonly: true
    })(FormComponent);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, { onSubmit: submit })
    ));
    var button = _reactAddonsTestUtils2['default'].findRenderedDOMComponentWithTag(dom, 'form');

    _reactAddonsTestUtils2['default'].Simulate.submit(button);
  });

  it('should call async onSubmit prop', function (done) {
    var submit = function submit(values) {
      _expect2['default'](values).toEqual({
        foo: undefined,
        bar: undefined
      });
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve();
        }, 100);
      }).then(done);
    };

    var FormComponent = (function (_Component4) {
      _inherits(FormComponent, _Component4);

      function FormComponent() {
        _classCallCheck(this, FormComponent);

        _Component4.apply(this, arguments);
      }

      FormComponent.prototype.render = function render() {
        return _react2['default'].createElement('form', { onSubmit: this.props.handleSubmit });
      };

      return FormComponent;
    })(_react.Component);

    FormComponent.propTypes = {
      handleSubmit: _react.PropTypes.func.isRequired
    };

    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['foo', 'bar'],
      readonly: true
    })(FormComponent);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, { onSubmit: submit })
    ));
    var button = _reactAddonsTestUtils2['default'].findRenderedDOMComponentWithTag(dom, 'form');

    _reactAddonsTestUtils2['default'].Simulate.submit(button);
  });

  it('should call submit function passed to handleSubmit', function (done) {
    var submit = function submit(values) {
      _expect2['default'](values).toEqual({
        foo: undefined,
        bar: undefined
      });
      done();
    };

    var FormComponent = (function (_Component5) {
      _inherits(FormComponent, _Component5);

      function FormComponent() {
        _classCallCheck(this, FormComponent);

        _Component5.apply(this, arguments);
      }

      FormComponent.prototype.render = function render() {
        return _react2['default'].createElement('form', { onSubmit: this.props.handleSubmit(submit) });
      };

      return FormComponent;
    })(_react.Component);

    FormComponent.propTypes = {
      handleSubmit: _react.PropTypes.func.isRequired
    };

    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['foo', 'bar'],
      readonly: true
    })(FormComponent);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, null)
    ));
    var button = _reactAddonsTestUtils2['default'].findRenderedDOMComponentWithTag(dom, 'form');

    _reactAddonsTestUtils2['default'].Simulate.submit(button);
  });

  it('should call submit function passed to async handleSubmit', function (done) {
    var submit = function submit(values) {
      _expect2['default'](values).toEqual({
        foo: undefined,
        bar: undefined
      });
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve();
        }, 100);
      }).then(done);
    };

    var FormComponent = (function (_Component6) {
      _inherits(FormComponent, _Component6);

      function FormComponent() {
        _classCallCheck(this, FormComponent);

        _Component6.apply(this, arguments);
      }

      FormComponent.prototype.render = function render() {
        return _react2['default'].createElement('form', { onSubmit: this.props.handleSubmit(submit) });
      };

      return FormComponent;
    })(_react.Component);

    FormComponent.propTypes = {
      handleSubmit: _react.PropTypes.func.isRequired
    };

    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['foo', 'bar'],
      readonly: true
    })(FormComponent);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, null)
    ));
    var button = _reactAddonsTestUtils2['default'].findRenderedDOMComponentWithTag(dom, 'form');

    _reactAddonsTestUtils2['default'].Simulate.submit(button);
  });

  it('should initialize a non-array field with an array value and let it read it back', function () {
    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['children'],
      initialValues: {
        children: [1, 2]
      }
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, null)
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);

    expectField({
      field: stub.props.fields.children,
      name: 'children',
      value: [1, 2],
      initial: [1, 2],
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false
    });
  });

  it('should initialize an array field with an array value', function () {
    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['colors[]'],
      initialValues: {
        colors: ['red', 'blue']
      }
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, null)
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);

    _expect2['default'](stub.props.fields.colors).toBeA('array');
    _expect2['default'](stub.props.fields.colors.length).toBe(2);
    expectField({
      field: stub.props.fields.colors[0],
      name: 'colors[0]',
      value: 'red',
      initial: 'red',
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false
    });
    expectField({
      field: stub.props.fields.colors[1],
      name: 'colors[1]',
      value: 'blue',
      initial: 'blue',
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false
    });
  });

  it('should initialize a deep array field with values', function () {
    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['users[].name', 'users[].age'],
      initialValues: {
        users: [{
          name: 'Bob',
          age: 27
        }]
      }
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, null)
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);

    _expect2['default'](stub.props.fields.users).toBeA('array');
    _expect2['default'](stub.props.fields.users.length).toBe(1);
    _expect2['default'](stub.props.fields.users[0]).toBeA('object');
    expectField({
      field: stub.props.fields.users[0].name,
      name: 'users[0].name',
      value: 'Bob',
      initial: 'Bob',
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false
    });
    expectField({
      field: stub.props.fields.users[0].age,
      name: 'users[0].age',
      value: 27,
      initial: 27,
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false
    });
  });

  it('should add array values with defaults', function () {
    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['users[].name', 'users[].age']
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, null)
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);

    _expect2['default'](stub.props.fields.users).toBeA('array');
    _expect2['default'](stub.props.fields.users.length).toBe(0);
    _expect2['default'](stub.props.fields.users.addField).toBeA('function');

    // add field
    stub.props.fields.users.addField({ name: 'Bob', age: 27 });

    // check field
    _expect2['default'](stub.props.fields.users.length).toBe(1);
    _expect2['default'](stub.props.fields.users[0]).toBeA('object');
    expectField({
      field: stub.props.fields.users[0].name,
      name: 'users[0].name',
      value: 'Bob',
      initial: 'Bob',
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false
    });
    expectField({
      field: stub.props.fields.users[0].age,
      name: 'users[0].age',
      value: 27,
      initial: 27,
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false
    });

    // check state
    _expect2['default'](store.getState().form.testForm.users).toBeA('array');
    _expect2['default'](store.getState().form.testForm.users.length).toBe(1);
    _expect2['default'](store.getState().form.testForm.users[0].name).toEqual({
      initial: 'Bob',
      value: 'Bob'
    });
    _expect2['default'](store.getState().form.testForm.users[0].age).toEqual({
      initial: 27,
      value: 27
    });
  });

  // Test to demonstrate bug: https://github.com/erikras/redux-form/issues/468
  //it('should add array values with DEEP defaults', () => {
  //  const store = makeStore();
  //  const form = 'testForm';
  //  const Decorated = reduxForm({
  //    form,
  //    fields: [
  //      'proposals[].arrival',
  //      'proposals[].departure',
  //      'proposals[].note',
  //      'proposals[].rooms[].name',
  //      'proposals[].rooms[].adults',
  //      'proposals[].rooms[].children'
  //    ]
  //  })(Form);
  //  const dom = TestUtils.renderIntoDocument(
  //    <Provider store={store}>
  //      <Decorated/>
  //    </Provider>
  //  );
  //  const stub = TestUtils.findRenderedComponentWithType(dom, Form);
  //
  //  expect(stub.props.fields.proposals).toBeA('array');
  //  expect(stub.props.fields.proposals.length).toBe(0);
  //  expect(stub.props.fields.proposals.addField).toBeA('function');
  //
  //  // add field
  //  const today = new Date();
  //  stub.props.fields.proposals.addField({
  //    arrival: today,
  //    departure: today,
  //    note: '',
  //    rooms: [{
  //      name: 'Room 1',
  //      adults: 2,
  //      children: 0
  //    }]
  //  });
  //
  //  // check field
  //  expect(stub.props.fields.proposals.length).toBe(1);
  //  expect(stub.props.fields.proposals[0]).toBeA('object');
  //  expectField({
  //    field: stub.props.fields.proposals[0].arrival,
  //    name: 'proposals[0].arrival',
  //    value: today,
  //    initial: today,
  //    valid: true,
  //    dirty: false,
  //    error: undefined,
  //    touched: false,
  //    visited: false
  //  });
  //  expectField({
  //    field: stub.props.fields.proposals[0].departure,
  //    name: 'proposals[0].departure',
  //    value: today,
  //    initial: today,
  //    valid: true,
  //    dirty: false,
  //    error: undefined,
  //    touched: false,
  //    visited: false
  //  });
  //  expectField({
  //    field: stub.props.fields.proposals[0].note,
  //    name: 'proposals[0].note',
  //    value: '',
  //    initial: '',
  //    valid: true,
  //    dirty: false,
  //    error: undefined,
  //    touched: false,
  //    visited: false
  //  });
  //  expectField({
  //    field: stub.props.fields.proposals[0].rooms[0].name,
  //    name: 'proposals[0].rooms[0].name',
  //    value: 'Room 1',
  //    initial: 'Room 1',
  //    valid: true,
  //    dirty: false,
  //    error: undefined,
  //    touched: false,
  //    visited: false
  //  });
  //  expectField({
  //    field: stub.props.fields.proposals[0].rooms[0].adults,
  //    name: 'proposals[0].rooms[0].adults',
  //    value: 2,
  //    initial: 2,
  //    valid: true,
  //    dirty: false,
  //    error: undefined,
  //    touched: false,
  //    visited: false
  //  });
  //  expectField({
  //    field: stub.props.fields.proposals[0].rooms[0].children,
  //    name: 'proposals[0].rooms[0].children',
  //    value: 0,
  //    initial: 0,
  //    valid: true,
  //    dirty: false,
  //    error: undefined,
  //    touched: false,
  //    visited: false
  //  });
  //});

  it('should initialize an array field, blowing away existing value', function () {
    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['children']
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, null)
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);

    // set value
    stub.props.fields.children.onChange([1, 2]);
    // check value
    expectField({
      field: stub.props.fields.children,
      name: 'children',
      value: [1, 2],
      initial: undefined,
      valid: true,
      dirty: true,
      error: undefined,
      touched: false,
      visited: false
    });
    // initialize new values
    stub.props.initializeForm({ children: [3, 4] });
    // check value
    expectField({
      field: stub.props.fields.children,
      name: 'children',
      value: [3, 4],
      initial: [3, 4],
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false
    });
    // check state
    _expect2['default'](store.getState().form.testForm.children).toEqual({
      initial: [3, 4],
      value: [3, 4]
    });
    // reset form to newly initialized values
    stub.props.resetForm();
    // check value
    expectField({
      field: stub.props.fields.children,
      name: 'children',
      value: [3, 4],
      initial: [3, 4],
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false
    });
  });

  it('should only initialize on mount once', function () {
    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['name']
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, { initialValues: { name: 'Bob' } })
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);

    // check value
    expectField({
      field: stub.props.fields.name,
      name: 'name',
      value: 'Bob',
      initial: 'Bob',
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false
    });
    // check state
    _expect2['default'](store.getState().form.testForm.name).toEqual({
      initial: 'Bob',
      value: 'Bob'
    });
    // set value
    stub.props.fields.name.onChange('Dan');
    // check value
    expectField({
      field: stub.props.fields.name,
      name: 'name',
      value: 'Dan',
      initial: 'Bob',
      valid: true,
      dirty: true,
      error: undefined,
      touched: false,
      visited: false
    });
    // check state
    _expect2['default'](store.getState().form.testForm.name).toEqual({
      initial: 'Bob',
      value: 'Dan'
    });

    // should NOT dispatch INITIALIZE this time
    var dom2 = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, { initialValues: { name: 'Bob' } })
    ));
    var stub2 = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom2, Form);
    // check that value is unchanged
    expectField({
      field: stub2.props.fields.name,
      name: 'name',
      value: 'Dan',
      initial: 'Bob',
      valid: true,
      dirty: true,
      error: undefined,
      touched: false,
      visited: false
    });
    // check state
    _expect2['default'](store.getState().form.testForm.name).toEqual({
      initial: 'Bob',
      value: 'Dan'
    });

    // manually initialize new values
    stub2.props.initializeForm({ name: 'Tom' });
    // check value
    expectField({
      field: stub2.props.fields.name,
      name: 'name',
      value: 'Tom',
      initial: 'Tom',
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false
    });
    // check state
    _expect2['default'](store.getState().form.testForm.name).toEqual({
      initial: 'Tom',
      value: 'Tom'
    });
  });

  it('should allow initialization from action', function () {
    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['name']
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, null)
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);

    // check value
    expectField({
      field: stub.props.fields.name,
      name: 'name',
      value: undefined,
      initial: undefined,
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false
    });
    // manually initialize new values
    stub.props.initializeForm({ name: 'Tom' });
    // check state
    _expect2['default'](store.getState().form.testForm.name).toEqual({
      initial: 'Tom',
      value: 'Tom'
    });
    // check value
    expectField({
      field: stub.props.fields.name,
      name: 'name',
      value: 'Tom',
      initial: 'Tom',
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false
    });
  });

  it('should allow deep sync validation error values', function () {
    var store = makeStore();
    var form = 'testForm';
    var deepError = {
      some: 'object with',
      deep: 'values'
    };
    var Decorated = reduxForm({
      form: form,
      fields: ['name'],
      validate: function validate() {
        return { name: deepError };
      }
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, null)
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);

    expectField({
      field: stub.props.fields.name,
      name: 'name',
      value: undefined,
      initial: undefined,
      valid: false,
      dirty: false,
      error: deepError,
      touched: false,
      visited: false
    });
  });

  it('should allow deep async validation error values', function () {
    var store = makeStore();
    var form = 'testForm';
    var deepError = {
      some: 'object with',
      deep: 'values'
    };
    var Decorated = reduxForm({
      form: form,
      fields: ['name'],
      initialValues: { name: 'Tom' },
      asyncValidate: function asyncValidate() {
        return Promise.reject({ name: deepError });
      }
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, null)
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);

    // check field before validation
    expectField({
      field: stub.props.fields.name,
      name: 'name',
      value: 'Tom',
      initial: 'Tom',
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false
    });
    return stub.props.asyncValidate().then(function () {
      _expect2['default'](true).toBe(false); // should not be in success block
    }, function () {
      // check state
      _expect2['default'](store.getState().form.testForm.name).toEqual({
        initial: 'Tom',
        value: 'Tom',
        asyncError: deepError
      });
      // check field
      expectField({
        field: stub.props.fields.name,
        name: 'name',
        value: 'Tom',
        initial: 'Tom',
        valid: false,
        dirty: false,
        error: deepError,
        touched: false,
        visited: false
      });
    });
  });

  it('should allow deep submit validation error values', function () {
    var store = makeStore();
    var form = 'testForm';
    var deepError = {
      some: 'object with',
      deep: 'values'
    };
    var Decorated = reduxForm({
      form: form,
      fields: ['name'],
      initialValues: { name: 'Tom' },
      onSubmit: function onSubmit() {
        return Promise.reject({ name: deepError });
      }
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, null)
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);

    // check before validation
    expectField({
      field: stub.props.fields.name,
      name: 'name',
      value: 'Tom',
      initial: 'Tom',
      valid: true,
      dirty: false,
      error: undefined,
      touched: false,
      visited: false
    });
    return stub.props.handleSubmit().then(function () {
      // check state
      _expect2['default'](store.getState().form.testForm.name).toEqual({
        initial: 'Tom',
        value: 'Tom',
        submitError: deepError,
        touched: true
      });
      // check field
      expectField({
        field: stub.props.fields.name,
        name: 'name',
        value: 'Tom',
        initial: 'Tom',
        valid: false,
        dirty: false,
        error: deepError,
        touched: true,
        visited: false
      });
    });
  });

  it('should only mutate the field that changed', function () {
    var store = makeStore();
    var form = 'testForm';
    var Decorated = reduxForm({
      form: form,
      fields: ['larry', 'moe', 'curly']
    })(Form);
    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(Decorated, null)
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, Form);

    var larry = stub.props.fields.larry;
    var moe = stub.props.fields.moe;
    var curly = stub.props.fields.curly;

    moe.onChange('BONK!');

    _expect2['default'](stub.props.fields.larry).toBe(larry);
    _expect2['default'](stub.props.fields.moe).toNotBe(moe);
    _expect2['default'](stub.props.fields.curly).toBe(curly);
  });

  it('should only rerender the form that changed', function () {
    var store = makeStore();
    var fooRender = createRestorableSpy().andReturn(_react2['default'].createElement('div', null));
    var barRender = createRestorableSpy().andReturn(_react2['default'].createElement('div', null));

    var FooForm = (function (_Component7) {
      _inherits(FooForm, _Component7);

      function FooForm() {
        _classCallCheck(this, FooForm);

        _Component7.apply(this, arguments);
      }

      FooForm.prototype.render = function render() {
        return fooRender();
      };

      return FooForm;
    })(_react.Component);

    var BarForm = (function (_Component8) {
      _inherits(BarForm, _Component8);

      function BarForm() {
        _classCallCheck(this, BarForm);

        _Component8.apply(this, arguments);
      }

      BarForm.prototype.render = function render() {
        return barRender();
      };

      return BarForm;
    })(_react.Component);

    var DecoratedFooForm = reduxForm({
      form: 'foo',
      fields: ['name']
    })(FooForm);
    var DecoratedBarForm = reduxForm({
      form: 'bar',
      fields: ['name']
    })(BarForm);

    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(DecoratedFooForm, null),
        _react2['default'].createElement(DecoratedBarForm, null)
      )
    ));
    var fooStub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, FooForm);

    // first render
    _expect2['default'](fooRender).toHaveBeenCalled();
    _expect2['default'](barRender).toHaveBeenCalled();

    // restore spies
    fooRender.restore();
    barRender.restore();

    // change field on foo
    fooStub.props.fields.name.onChange('Tom');

    // second render: only foo form
    _expect2['default'](fooRender).toHaveBeenCalled();
    _expect2['default'](barRender).toNotHaveBeenCalled();
  });

  it('should only rerender the field components that change', function () {
    var store = makeStore();
    var fooRenders = 0;
    var barRenders = 0;

    var FooInput = (function (_Component9) {
      _inherits(FooInput, _Component9);

      function FooInput() {
        _classCallCheck(this, FooInput);

        _Component9.apply(this, arguments);
      }

      FooInput.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        return this.props.field !== nextProps.field;
      };

      FooInput.prototype.render = function render() {
        fooRenders++;
        var field = this.props.field;

        return _react2['default'].createElement('input', _extends({ type: 'text' }, field));
      };

      return FooInput;
    })(_react.Component);

    FooInput.propTypes = {
      field: _react.PropTypes.object.isRequired
    };

    var BarInput = (function (_Component10) {
      _inherits(BarInput, _Component10);

      function BarInput() {
        _classCallCheck(this, BarInput);

        _Component10.apply(this, arguments);
      }

      BarInput.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        return this.props.field !== nextProps.field;
      };

      BarInput.prototype.render = function render() {
        barRenders++;
        var field = this.props.field;

        return _react2['default'].createElement('input', _extends({ type: 'password' }, field));
      };

      return BarInput;
    })(_react.Component);

    BarInput.propTypes = {
      field: _react.PropTypes.object.isRequired
    };

    var FieldTestForm = (function (_Component11) {
      _inherits(FieldTestForm, _Component11);

      function FieldTestForm() {
        _classCallCheck(this, FieldTestForm);

        _Component11.apply(this, arguments);
      }

      FieldTestForm.prototype.render = function render() {
        var _props$fields = this.props.fields;
        var foo = _props$fields.foo;
        var bar = _props$fields.bar;

        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(FooInput, { field: foo }),
          _react2['default'].createElement(BarInput, { field: bar })
        );
      };

      return FieldTestForm;
    })(_react.Component);

    FieldTestForm.propTypes = {
      fields: _react.PropTypes.object.isRequired
    };

    var DecoratedForm = reduxForm({
      form: 'fieldTest',
      fields: ['foo', 'bar']
    })(FieldTestForm);

    var dom = _reactAddonsTestUtils2['default'].renderIntoDocument(_react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(DecoratedForm, null)
    ));
    var stub = _reactAddonsTestUtils2['default'].findRenderedComponentWithType(dom, FieldTestForm);

    // first render
    _expect2['default'](fooRenders).toBe(1);
    _expect2['default'](barRenders).toBe(1);

    // change field foo
    stub.props.fields.foo.onChange('Tom');

    // second render, only foo should rerender
    _expect2['default'](fooRenders).toBe(2);
    _expect2['default'](barRenders).toBe(1);

    // change field bar
    stub.props.fields.bar.onChange('Jerry');

    // third render, only bar should rerender
    _expect2['default'](fooRenders).toBe(2);
    _expect2['default'](barRenders).toBe(2);
  });

  // Test to show bug https://github.com/erikras/redux-form/issues/550
  // ---
  // It's caused by the fact that we're no longer using the same field instance
  // throughout the lifetime of the component. Since the fields are immutable now,
  // the field.value given to createOnDragStart() no longer refers to the current
  // value.
  // ---
  //it('should drag the current value', () => {
  //  const store = makeStore();
  //  const form = 'testForm';
  //  const Decorated = reduxForm({
  //    form,
  //    fields: ['name']
  //  })(Form);
  //  const dom = TestUtils.renderIntoDocument(
  //    <Provider store={store}>
  //      <Decorated/>
  //    </Provider>
  //  );
  //  const stub = TestUtils.findRenderedComponentWithType(dom, Form);
  //
  //  stub.props.fields.name.onChange('FOO');
  //  const setData = createSpy();
  //  stub.props.fields.name.onDragStart({dataTransfer: {setData}});
  //
  //  expect(setData)
  //    .toHaveBeenCalled()
  //    .toHaveBeenCalledWith('value', 'FOO');
  //});
});