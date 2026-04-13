import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
// 按需导入element-plus的补丁
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
  ElementPlusResolver
} from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/，element-plus
export default defineConfig({
  plugins: [vue(), AutoImport({
    resolvers: [ElementPlusResolver()]
  }),
            Components({
              resolvers: [ElementPlusResolver()]
            })
           ]
})
