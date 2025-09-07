const path = require('path')
const glob = require('glob')
const fs = require('fs')

/**
 * @typedef {string | string[]} PageEntry
 * @typedef {{ entry: PageEntry; [key: string]: any;}} PageConfig
 */

/**
 *
 * @param {string} dir
 * @returns {string}
 */
const resolve = dir => path.resolve(__dirname, dir)

/**
 * 自动添加页面
 * @returns {{[key: string]: PageEntry | PageConfig}}
 */
function createPage() {
  const paths = glob.sync('src/pages/**/main.js')
  const pages = {}
  paths.forEach(path => {
    const fileName = path.match(/(?:src\/pages\/)(\w+)(?=\/main.js)/)[1]

    const meta = fs.readFileSync(resolve(`src/pages/${fileName}/meta.json`), { encoding: 'utf-8' })

    const data = JSON.parse(meta)
    pages[fileName] = {
      entry: path,
      template: resolve('public/index.html'),
      fileName: `${fileName}.html`,
      ...data
    }
  })
  return pages
}

const ENV_MAP = {
  development: '开发环境',
  production: '生产环境',
  test: '测试环境'
}

console.log('当前打包环境为', ENV_MAP[process.env.VUE_APP_ENV])

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  devServer: {
    port: 8080
  },
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'element-ui': 'ELEMENT',
      vuex: 'Vuex',
      // 'vuex-persist': 'VuexPersistence',
    },
  },
  pages: createPage(),
  // pages: {
  //   cart: {
  //     filename: 'cart.html',
  //     entry: resolve('src/pages/cart/main.ts'),
  //     template: resolve('public/cart/index.html'),
  //   },
  //   goods: {
  //     filename: 'goods.html',
  //     entry: resolve('src/pages/goods/main.ts'),
  //     template: resolve('public/goods/index.html')
  //   },
  // },
  css: {
    sourceMap: process.env.VUE_APP_ENV !== 'production'
  },
  productionSourceMap: process.env.VUE_APP_ENV !== 'production',
  chainWebpack: webpack => {
    webpack.resolve.alias
      .set('api', resolve('src/api'))
      .set('style', resolve('src/style'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('store', resolve('src/store'))
      .set('views', resolve('src/views'))
      .set('tools', resolve('src/tools'))
      .set('@types', resolve('src/@types'))
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [
        resolve('src/style/_variable.styl'),
        resolve('src/style/_mixins.styl'),
      ]
    }
  }
}
