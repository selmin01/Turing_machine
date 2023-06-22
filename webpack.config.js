const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    global: "./src/index.ts",
    main: "./src/scripts/machine_turing.ts",
    turing_machine: "./src/scripts/script.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/pages/index.html",
      filename: "index.html",
      chunks: ["global", "main"]
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/turing-machine.html",
      filename: "turing-machine.html",
      chunks: ["global", "turing_machine"]
    })
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