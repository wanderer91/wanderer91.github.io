import { renderTool } from "../views/tool.js";

export default class Tools {
    $contentEl = null;
    tools = [];

    constructor(contentSelector = "") {
        this.$contentEl = $(contentSelector);
        this.getAll();
    }

    async getAll() {
        const resp = await axios.get("data/tools.json");
        this.tools = resp.data || [];

        this.init();
    }

    init() {
        const cards = this.tools.map((item) => renderTool(item)).join("");
        this.$contentEl.html(`<div class="skills__grid w-100">${cards}</div>`);
        this.$contentEl.removeClass("loading");
    }
}