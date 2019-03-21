// module.exports = ({ file, options, env }) => ({
//   plugins: {
//     'cssnano': (env === 'production') ? {} : false,
//     'autoprefixer': {},
//   }
// })

module.exports = ({ file, options, env }) => {
    console.log('ENVIRONMENT', env, process.env.NODE_ENV)

    return {
        plugins: {
            // CSSnano - only use on production.
            'cssnano': ( env === 'production' ) ? true : false,
            // Autoprefixer - don't use on development.
            'autoprefixer': ( env !== 'development' ) ? true : false,
        }
    }
};