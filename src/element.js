/* eslint-env browser */
import { replaceNode } from "uitil/dom";

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
		replaceNode(this.replace ? this : target, ...html2dom(html));
	}

	retrieve(uri) {
		let options = {
			headers: {
				Accept: "text/html; fragment=true"
			},
			credentials: this.cors ? "include" : "same-origin"
		};
		return fetch(uri, options).
			then(res => {
				if(!res.ok) {
					throw new Error(`unexpected response at <${uri}>`);
				}
				return res.text();
			});
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

function html2dom(html) {
	let tmp = document.createElement("div");
	tmp.innerHTML = html;
	return Array.prototype.slice.call(tmp.childNodes);
}
