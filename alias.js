// WORKAROUND TO MAKE WEBSTORM/PHPSTORM UNDERSTAND ALIASES
// https://youtrack.jetbrains.com/issue/WEB-22717#focus=streamItem-27-1558931-0-0

/* eslint-disable */

System.config({
    'paths': {
        '~/*': './src/*',
        '~api/*': './src/routes/api/*',
        '~database/*': './src/database/*',
        '~middlewares/*': './src/middlewares/*',
        '~server/*': './src/server/*',
        '~utils/*': './src/utils/*',
    }
});

/* eslint-enable */
