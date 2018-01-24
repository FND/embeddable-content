(function () {
'use strict';

if(typeof global === "undefined" && typeof window !== "undefined") {
	window.global = window;
}

function replaceNode(oldNode, ...newNodes) {
	let container = oldNode.parentNode;
	newNodes.forEach(node => {
		container.insertBefore(node, oldNode);
	});
	container.removeChild(oldNode);
}

class EmbeddableContent extends HTMLElement {
	connectedCallback() {
		let { link } = this;
		this.retrieve(link.href).
			then(html => {
				replaceNode(this.replace ? this : link, ...html2dom(html));
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
	get replace() {
		return this.hasAttribute("replace");
	}
	get link() {
		return this.querySelector("a");
	}
}
function html2dom(html) {
	let tmp = document.createElement("div");
	tmp.innerHTML = html;
	return [...tmp.childNodes];
}

customElements.define("embeddable-content", EmbeddableContent);

}());
