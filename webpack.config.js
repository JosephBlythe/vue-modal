var webpack           = require("webpack");

module.exports = {
  
  entry: ['./src/index.js'],
  
  output: {
    path: __dirname + '/dist',
    // publicPath: '/public/',
    filename: 'vue-modal.js'
  },

  // plugins: plugins,

  module: {
    loaders: [
      
      // process *.vue files using vue-loader
      { test: /\.vue$/, loader: 'vue' },
      
      // process *.js files using babel-loader
      // the exclude pattern is important so that we don't
      // apply babel transform to all the dependencies!
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
    ]
  },

  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  }
}