const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    bundle: "./src/script/index.ts", // Main TypeScript entry point
    homepage2: "./src/script/homepage2.ts", // Homepage 2 styles only
    homepage_final: "./src/script/homepage_final.ts", // Homepage Final styles only
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Cleans the 'dist' folder before each build
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // Injects CSS into the DOM
          "css-loader", // Interprets @import and url()
          "sass-loader", // Compiles Sass to CSS
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".scss"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Index (Homepage Final)
      filename: "index.html",
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: "./src/homepage_1.html", // Homepage 1
      filename: "homepage_1.html",
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: "./src/homepage_2.html", // Homepage 2
      filename: "homepage_2.html",
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: "./src/resume.html", // Resume page
      filename: "resume.html",
      inject: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          to: ".", // Copies to the root of the dist folder
          noErrorOnMissing: true, // Don't error if the folder doesn't exist
        },
      ],
    }),
  ],
  devServer: {
    static: "./dist", // Serve content from the 'dist' directory
    open: true, // Open the browser after server starts
  },
};
