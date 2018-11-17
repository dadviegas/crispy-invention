import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const babelConf = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
  },
};

const cssConf = {
  test   : /\.(scss|css)$/,
  resolve: { extensions: [".scss", ".css"] },
  use: [
    MiniCssExtractPlugin.loader,
    { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
    { loader: 'sass-loader', options: { sourceMap: true } },
  ],
}

const filesConf = {
  test: /\.(png|jpg|gif)$/i,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 10000,
        outputPath: '/images/',
        name: '[name].[hash:8].[ext]',
      },
    },
  ],
}

export default (options) => ({
  rules: [
    babelConf,
    cssConf,
    filesConf,
  ].filter(m => m),
});
