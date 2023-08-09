const path = require(`path`);
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  /**
     * when importing components from other projects,
     * this configuration is needed to avoid error caused
     * by vue being loaded multiple times
     */
   configureWebpack: {
    devtool: 'source-map',
    resolve: {
      symlinks: false,
      alias: {
          vue: path.resolve(`./node_modules/vue`)
      }
    }
  },
  // chainWebpack: config => {
  //   config.optimization.delete('splitChunks')
  // },
  // publicPath: './',
  productionSourceMap: false,
  css: {
    extract: false
  },
  devServer: {
    client: {
      overlay: {
        warnings: false,
        errors: true
      },
    },
    proxy: {
      "/__redcap": {
        target: "https://redcap.test/",
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          "^/__redcap": ""
        }
      },
      "/api": {
        target: "https://redcap.test/API_PROXY/index.php",
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      
      /* "/api": {
        target: "https://redcap.test/API_PROXY/index.php",
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }, */
    }
  }
})
