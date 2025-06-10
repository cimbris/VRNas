import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import postcssPresetEnv from "postcss-preset-env";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env) => {
    const isDev = env.mode === "development";

    return {
        mode: env.mode ?? "development",
        entry: {
            main: [
                "@babel/polyfill",
                path.resolve(__dirname, "./src/index-entry.js"),
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: path.resolve(__dirname, "./src/index.html"),
                chunks: ["main"],
            }),
            new MiniCssExtractPlugin({
                filename: isDev ? "[name].css" : "css/[name][contenthash].css",
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.html$/i,
                    loader: "html-loader",
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    auto: /\.module\.css$/,
                                },
                            },
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [postcssPresetEnv()],
                                },
                            },
                        },
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: "asset/resource",
                    generator: {
                        filename: "fonts/[name][ext]",
                    },
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: "asset/resource",
                    generator: {
                        filename: "img/[name][hash][ext]",
                    },
                },
                {
                    test: /\.(?:js|mjs|cjs)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ["@babel/preset-env", { targets: "defaults" }],
                            ],
                        },
                    },
                },
            ],
        },
        resolve: {
            extensions: [".jsx", ".tsx", ".ts", ".js"],
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            clean: true,
            filename: "[name].[contenthash].js",
            // publicPath: '/',
        },
        devtool: isDev ? "inline-source-map" : undefined,
        devServer: {
            static: "./dist",
            port: 5001,
            hot: true,
        },
    };
};
