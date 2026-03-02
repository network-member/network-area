# The home for my pet projects 🐼

The idea is to have a room for projects which life cycle was handled fully on my own: from planning to prod deployment. It may also be a portfolio, because all commercial apps I am associated with are private by known reason.

### Services are accessible through **https://network-area.online** 🚀

## API

- tsx is replaced with ts-node, because now it has built-in ESM support + tsx esbuild doesn't support decorators at all, but they required for ORM models;

- native ts-node esm loader is extended in order to resolve project absolute paths;

- [pino logger](https://getpino.io) is implemented for structured and contextual logging. ALS is used to store / pull `traceId`;
