'use strict';

var _jsdom = require('jsdom');

global.document = _jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;