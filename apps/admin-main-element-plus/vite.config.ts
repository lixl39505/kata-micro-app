import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${pathSrc}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`,
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
        my: FileSystemIconLoader(path.join(pathSrc, 'assets/icons'), (svg) => svg.replace(/^<svg /, '<svg fill="currentColor" ')),
      },
      iconCustomizer(collection, icon, props) {
        // customize all icons in this collection
        if (collection === 'my') {
          props.width = ''
          props.height = ''
        }
      },
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        // 自动引入图标组件
        IconsResolver({
          prefix: 'icon', // <icon-collection-name>
          customCollections: ['my'],
        }),

        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      dts: 'src/components.d.ts',
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true,
        }),
      ],
      transformers: [transformerDirectives(), transformerVariantGroup()],
    }),
  ],
})
