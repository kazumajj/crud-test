import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
// import {sass} from '@rsbuild/plugin-sass'
// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
});
