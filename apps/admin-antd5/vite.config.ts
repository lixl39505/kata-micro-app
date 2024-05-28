import path, { resolve } from 'node:path'
import fs from 'node:fs'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

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
    plugins: [react()],
  }
})
