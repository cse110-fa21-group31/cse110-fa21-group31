// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config

    // config.env.googleRefreshToken = process.env.GOOGLE_REFRESH_TOKEN;
    // config.env.googleClientId = process.env.REACT_APP_GOOGLE_CLIENTID;
    // config.env.googleClientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
    on("before:browser:launch", (browser = {}, args) => {
        console.log(config, browser, args);
        if (browser.name === "chrome") {
            args.push(
                "--disable-features=CrossSiteDocumentBlockingIfIsolating,CrossSiteDocumentBlockingAlways,IsolateOrigins,site-per-process"
            );
        }
        return args;
    });
    return config;
};
