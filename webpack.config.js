export const entry = "./src/index.ts";
export const output = {
  filename: "./dist/bundle.js",
};
export const devtool = "source-map";
export const resolve = {
  // Add '.ts' and '.tsx' as resolvable extensions.
  extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
};
export const module = {
  rules: [
    // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
    { test: /\.tsx?$/, loader: "ts-loader" },
    // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
    { test: /\.js$/, loader: "source-map-loader" },
  ],
};
