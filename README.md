vanilla JS
[Custom Element](https://www.webcomponents.org/introduction#custom-elements)
for client-side transclusion


Usage
-----

```html
<embeddable-content>
    <a href="/path/to/html">details</a>
</embeddable-content>
```

* `<embeddable-content cors>` enables transclusion
  [across origins](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
* `<embeddable-content replace>` disposes of the `<embeddable-content>` wrapper
  element upon transclusion


Getting Started
---------------

* ensure [Node](http://nodejs.org) is installed
* `npm install` downloads dependencies
* `npm run compile` performs a one-time compilation, generating
  `dist/embeddable-content.js` (via [faucet-pipeline](http://faucet-pipeline.org))
* `npm start` automatically recompiles while monitoring code changes
* `npm test` checks code for stylistic consistency
