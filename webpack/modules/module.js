"use strict";

/**
 * Export
 */
module.exports = (env = {}) => {
  return {
    rules: getRules(env),
  };
};

/**
 * Get rules
 */
function getRules(env) {
  const isDev = !env.PRODUCTION;
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");

  return [
    {
      test: /\.styl(us)?$/,
      oneOf: [
        {
          resourceQuery: /vue/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: isDev,
              },
            },
            "stylus-loader",
          ],
        },
        {
          resourceQuery: /(?!vue)/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: isDev,
              },
            },
            "less-loader",
          ],
        },
      ],
    },

    {
      test: /\.less$/,
      oneOf: [
        {
          resourceQuery: /vue/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: isDev,
              },
            },
            "less-loader",
          ],
        },
        {
          resourceQuery: /(?!vue)/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: isDev,
              },
            },
            "less-loader",
          ],
        },
      ],
    },

    {
      test: /\.(scss|sass|css)$/,
      oneOf: [
        {
          resourceQuery: /vue/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: isDev,
              },
            },
            "sass-loader",
          ],
        },
        {
          resourceQuery: /(?!vue)/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: isDev,
              },
            },
            "sass-loader",
          ],
        },
      ],
    },

    {
      test: /\.pug$/,
      oneOf: [
        // this applies to `<template lang="pug">` in Vue components
        {
          resourceQuery: /^\?vue/,
          use: ["pug-plain-loader"],
        },

        // this applies to pug imports inside JavaScript
        {
          use: ["raw-loader", "pug-plain-loader"],
        },
      ],
    },

    {
      test: /\.vue$/,
      loader: "vue-loader",
    },

    {
      test: /\.tsx?$/,
      loader: "ts-loader",
      exclude: /node_modules/,
      options: { appendTsSuffixTo: [/\.vue$/], compiler: "ttypescript" },
    },

    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    },

    {
      test: /\.txt$/,
      use: "raw-loader",
    },
  ];
}