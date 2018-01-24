/* eslint-env browser */
import { replaceNode } from "uitil/dom";

export default class EmbeddableContent extends HTMLElement {
	connectedCallback() {
		let { link } = this;
		this.retrieve(link.href).then(html => {
			let container = document.createElement("div");
			container.innerHTML = html.trim();
			// NB: the contract here is that the server always provides
			//     exactly one root element
			replaceNode(link, container.firstChild);
		});
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

	get link() {
		return this.querySelector("a");
	}
}
