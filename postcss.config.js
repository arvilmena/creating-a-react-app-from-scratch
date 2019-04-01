module.exports = ({ file, options, env }) => {
  console.log('> detecting PostCSS environment:', 'env: ', env, 'process.env.NODE_ENV', process.env.NODE_ENV);

  return {
    plugins: {
      // CSSnano - only use on production.
      'cssnano': ( env === 'production' ),
      // Autoprefixer - don't use on development.
      'autoprefixer': ( env !== 'development' ),
    }
  }
};
