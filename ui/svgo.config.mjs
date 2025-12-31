/**
 * @type {import("svgo").Config}
 */
const config = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
    },
    { name: 'addAttributesToSVGElement', params: { attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }] } },
  ],
}

export default config
