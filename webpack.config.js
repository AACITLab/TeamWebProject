
module.exports = {
 
  entry: './src/main.js',
 
  output: {
    filename: 'bundle.js'
  },
  resolve: {
  alias: {
    vue: 'vue/dist/vue.js'
  }
},
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        exclude: /(node_modules|bower_components)/,
        
      use: {
        loader: 'vue-loader'
      }
    }
  ]
},

}
