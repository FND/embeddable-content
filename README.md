vanilla JS
[Custom Element](https://www.webcomponents.org/introduction#custom-elements)
for client-side transclusion


Usage
-----

```
$ npm install embeddable-content
```

```javascript
import "embeddable-content";
```

```html
<embeddable-content>
    <a href="/path/to/html">details</a>
</embeddable-content>
```

* `<embeddable-content cors>` enables transclusion
  [across origins](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
* `<embeddable-content replace>` disposes of the `<embeddable-content>` wrapper
  element upon transclusion

There's also a variant for imperatively updating transcluded content via
[morphdom](https://github.com/patrick-steele-idem/morphdom):

```javascript
import RefreshableEmbeddableContent from "embeddable-content/refreshable";

customElements.define("embeddable-content", RefreshableEmbeddableContent);

// periodically refresh transclusions
setInterval(_ => {
    let nodes = document.querySelectorAll("embeddable-content");
    [...nodes].forEach(node => {
        node.refresh();
    });
}, 60 * 1000);
```

(note that morhpdom is not included as a dependency of this package)


Contributing
------------

* ensure [Node](http://nodejs.org) is installed
* `npm install` downloads dependencies
* `npm run compile` performs a one-time compilation, generating
  `dist/embeddable-content.js` (via [faucet-pipeline](http://faucet-pipeline.org))
* `npm start` automatically recompiles while monitoring code changes
* `npm test` checks code for stylistic consistency
