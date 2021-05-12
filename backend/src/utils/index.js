module.exports = {
  loadModules: function () {
    require("require-dir-all")(__dirname + "../../", {
      recursive: true,
      indexAsParent: true,
      includeFiles: /index\.js$/i,
    });
  },

  loadRoutes: function (app) {
    const allRoutes = require("require-dir-all")(__dirname + "../../", {
      recursive: true,
      indexAsParent: true,
      includeFiles: /routes\.js$/i,
      excludeDirs: /^(\utils|_helpers|entry|notification|notification_log|notification_settings|notification_type|product|reciept|stock|stocktaking|stocktaking_product|warehouse)$/,
    });

    for (const [name, route] of Object.entries(allRoutes)) {
      app.use("/" + name, route.routes);
    }
    return allRoutes;
  },
};
