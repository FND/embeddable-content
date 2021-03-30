/* eslint-env browser */
import { html2dom } from "uitil/dom/html";
import { replaceNode } from "uitil/dom";
import httpRequest from "uitil/dom/http";

export default class EmbeddableContent extends HTMLElement {
	connectedCallback() {
		let { link } = this;
		let uri = link.href;
		this.retrieve(uri).
			then(html => {
				this.uri = uri;
				this.transclude(html, link);
			});
	}

	transclude(html, target) {
		let doc = html2dom(html);
		let nodes = Array.prototype.slice.call(doc.childNodes);
		replaceNode.apply(null, [this.replace ? this : target].concat(nodes));
	}

	retrieve(uri) {
		this.setAttribute("aria-busy", "true");
		return this.httpRequest(uri).
			then(res => {
				this.removeAttribute("aria-busy");
				return res.text();
			}, err => {
				this.removeAttribute("aria-busy");
				throw err;
			});
	}

	httpRequest(uri) {
		return httpRequest("GET", uri, { Accept: "text/html; fragment=true" },
				null, { cors: this.cors, strict: true });
	}

	get cors() {
		return this.hasAttribute("cors");
	}

	get replace() {
		return this.hasAttribute("replace");
	}

	get link() {
		// NB: avoids erroneously returning a transcluded link's URI
		return this.uri ? null : this.querySelector("a");
	}
}
