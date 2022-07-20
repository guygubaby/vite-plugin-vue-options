import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import { VueOptions } from '../src/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [Vue(), Inspect(), VueOptions()],
})
