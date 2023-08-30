import { defineConfig } from 'vite'
import * as path from 'path'
import presetAttributify from '@unocss/preset-attributify'
import react from '@vitejs/plugin-react-swc'
import UnoCSS from 'unocss/vite'
import PresetTailwind from '@unocss/preset-wind'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'
import transformerDirectives from '@unocss/transformer-directives'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnoCSS({
      /* options */
      rules: [
        ['BigNumberColor', { color: '#3ead91' }],
        ['WholeBackground', {'background-color': '#061326'}]
      ],
      presets: [
        // 属性化unocss
        presetAttributify(
          {}
        ),
        // tailwind和wind-css预设
        PresetTailwind()
      ],
      transformers: [
// @ts-ignore
        transformerDirectives(),
        // tsx/jsx中属性化使用unocss
        transformerAttributifyJsx(),
      ]
    }),
  ],
  resolve: {
    alias: [
      {find: /^~/, replacement: ''},
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        math: 'always'
      }
    }
  }
})
