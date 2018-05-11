/* eslint-env node */
'use strict';

var yaml2json = require('broccoli-yaml');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var json2js = require('broccoli-json-module');
var path = require('path');

var checker = require('ember-cli-version-checker');

try {
  var stew = require('broccoli-stew');
  var log = stew.log;
} catch (er) {
  log = null;
}

module.exports = {
  name: 'ember-i18n-yaml',

  isDevelopingAddon: function() {
    return false;
  },

  shouldSetupRegistryInIncluded: function() {
    return !checker.isAbove(this, '0.2.0');
  },

  included: function included(app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this.app = app;

    if (this.shouldSetupRegistryInIncluded()) {
      this.setupPreprocessorRegistry('parent', app.registry);
    }
  },

  setupPreprocessorRegistry: function(type, registry) {

    registry.add('js', {
      name: 'ember-i18n-yaml',
      ext: ['yaml', 'yml'],
      _addon: this,
      toTree: function(tree) {

        if (this._addon.isDevelopingAddon() && log) {
          tree = log(tree, {label: 'ember-i18n-yaml unfiltered tree'});
        }

        var yaml = new Funnel(tree, {
          include: [path.join('**', 'locales', '**', '*.yml'), path.join('**', 'locales', '**', '*.yaml')]
        });

        if (this._addon.isDevelopingAddon() && log) {
          yaml = log(yaml, {label: 'ember-i18n-yaml filtered tree'});
        }

        var json = yaml2json(yaml, { spaces: 2 });

        return mergeTrees([tree, json2js(json)]);
      }
    });
  }

};
