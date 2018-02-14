/* jshint node: true */

const path = require('path');
const FeatureParser = require('./lib/feature-parser');

module.exports = {
  name: 'ember-cli-yadda',
  getTestFramework() {
    const packages = Object.keys(this.project.addonPackages);
    if (packages.indexOf('ember-cli-mocha') > -1) {
      return 'mocha';
    }
    return 'qunit';
  },
  setupPreprocessorRegistry(type, registry) {
    const testFramework = this.getTestFramework();
    const self = this;
    registry.add('js', {
      name: 'ember-cli-yadda',
      ext: ['feature', 'spec', 'specification'],
      toTree(tree) {
        return new FeatureParser(tree, testFramework, self.options);
      },
    });
  },
  blueprintsPath() {
    return path.join(__dirname, 'blueprints', this.getTestFramework());
  },
  included(app) {
    this._super.included(app);
    const options = app.options['ember-cli-yadda'] || {};
    if (typeof options.persist === 'undefined') {
      options.persist = true;
    }
    this.options = options;
  },
};
