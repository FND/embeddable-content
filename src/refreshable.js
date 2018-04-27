/* eslint-env browser */
import EmbeddableContent from "./element";
import morphdom from "morphdom";

export default class RefreshableEmbeddableContent extends EmbeddableContent {
	refresh() {
		let { uri } = this; // also indicates initial transclusion has completed
		if(!uri) {
			return;
		}
		if(this.pending) {
			this.pending++;
			return;
		}

		this.pending = 1;
		this.retrieve(uri).
			then(html => {
				morphdom(this, `<div>${html}</div>`, { childrenOnly: true });

				if(--this.pending) { // discharge any queued refresh requests in one go
					this.pending = 0;
					this.refresh();
				}
			});
	}
}
