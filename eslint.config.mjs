// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here

  {
    files: ['components/**/*.{vue,ts,tsx}'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
)
