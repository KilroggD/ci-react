
module.exports = {
  context: __dirname + "/js",
  entry: "./react/main.js",
  output: {
    path: './js/',
    filename: "index.js",
    publicPath: '/'
  },  
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
