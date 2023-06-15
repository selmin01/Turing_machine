const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "src/index.html" })
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
      }
    ]
  },
  resolve: { extensions: [ ".ts", ".js" ] }
}