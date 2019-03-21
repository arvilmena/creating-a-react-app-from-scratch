// module.exports = ({ file, options, env }) => ({
//   plugins: {
//     'cssnano': (env === 'production') ? {} : false,
//     'autoprefixer': {},
//   }
// })

module.exports = ({ file, options, env }) => {
  console.log('env',env);
};