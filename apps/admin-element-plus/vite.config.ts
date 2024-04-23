import path, { resolve } from 'node:path'
import fs from 'node:fs'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import Unocss from 'unocss/vite'

const pathSrc = resolve(__dirname, 'src')
const pkgJson = JSON.parse(fs.readFileSync('./package.json', { encoding: 'utf-8' }))

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const { VITE_PORT, VITE_BASE_URL } = loadEnv(mode, process.cwd())

  return {
    base: VITE_BASE_URL,
    server: {
      // 端口号
      port: parseInt(VITE_PORT),
      // 监听所有地址
      host: '0.0.0.0',
      // 服务启动时是否自动打开浏览器
      open: true,
      // 允许跨域
      cors: true,
      // 自定义代理规则
      proxy: {},
    },
    define: {
      VITE_APP_NAME: JSON.stringify(pkgJson.name),
    },
    resolve: {
      alias: {
        '~/': `${pathSrc}/`,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/styles/theme.scss" as *;`,
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      Icons({
        compiler: 'vue3',
        customCollections: {
          // 本地 svg 图标
          my: FileSystemIconLoader(path.join(pathSrc, 'assets/icons'), (svg) =>
            svg.replace(/^<svg /, '<svg fill="currentColor" '),
          ),
        },
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dirs: [path.join(pathSrc, 'utils')],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          // element-plus 组件
          ElementPlusResolver({
            importStyle: 'sass',
          }),
          // iconify 组件
          IconsResolver({
            prefix: 'icon', // <icon-collection-name>
            customCollections: ['my'],
          }),
        ],
      }),
      // 动态 svg-icon
      createSvgIconsPlugin({
        iconDirs: [resolve(__dirname, 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
        inject: 'body-last',
        customDomId: '__svg__icons__dom__',
      }),
      // https://github.com/antfu/unocss
      Unocss(),
    ],
  }
})
