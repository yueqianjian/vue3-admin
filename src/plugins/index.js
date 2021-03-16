const plugins = {
  install(app, options) {
    console.log("app", app, options);
    app.provide("user", "options");
    app.provide("user2", "options2");
    app.mixin({
      created() {
        console.log("~~~~~~");
      },
    });
  },
};

export default plugins;
