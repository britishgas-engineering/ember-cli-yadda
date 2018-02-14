function testFeature(feature) {
  if (feature.annotations.ignore) {
    skip(`Feature: ${feature.title}`, function(assert) { });;
  } else {
    module(`Feature: ${feature.title}`, {
      beforeEach: function() {
        this.application = startApp();
        var stub = Ember.Object.create({
          location: function(location){
            window.test = location;
          }
        });
        this.application.__container__.unregister('service:window');
        this.application.register('service:window', stub, {instantiate: false});
      },
      afterEach: function() {
        destroyApp(this.application);
      }
    });

    feature.scenarios.forEach(function(scenario) {
      if (scenario.annotations.ignore) {
        skip(`Scenario: ${scenario.title}`, function(assert) { });
      } else {
        test(`Scenario: ${scenario.title}`, function(assert) {
          let self = this;
          return new Ember.RSVP.Promise(function(resolve) {
            yadda.Yadda(library.default(assert), self).yadda(scenario.steps, { ctx: {} }, function next(err, result) {
              if (err) {
                throw err;
              }

              resolve(result);
            });
          });
        });
      }
    });
  }
};
