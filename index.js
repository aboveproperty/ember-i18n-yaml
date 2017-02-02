/* jshint node: true */
'use strict';

var yaml2json = require('broccoli-yaml');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var json2js = require('broccoli-json-module');
var path = require('path');

module.exports = {
  name: 'ember-i18n-yaml',

  isDevelopingAddon: function() {
    return false;
  },

  treeForApp: function() {

    this._super.included.apply(this, arguments);

    var tree = this.app.trees.app;

    var yaml = new Funnel(tree, {
      include: [path.join('locales', '*', '*.yml'), path.join('locales', '*', '*.yaml')]
    });

    var json = yaml2json(yaml, { spaces: 2 });

    return mergeTrees([tree, json2js(json)]);
  }
};
