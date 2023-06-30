const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: {
    global: "./src/index.ts",
    form: "./src/scripts/form/formHandler.ts",
    machine: "./src/scripts/mockScript.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/pages/index.html",
      filename: "index.html",
      chunks: ["global", "form"]
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/turing-machine.html",
      filename: "turing-machine.html",
      chunks: ["global", "machine"]
    }),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        // options: { configFile: "./tsconfig.json" },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  resolve: { extensions: [".ts", ".js"] },
  devServer: {
    port: 3000,
    hot: false,
    open: true,
    liveReload: true
  }
}