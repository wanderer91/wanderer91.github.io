import { renderTool } from "../views/tool.js";

export default class Tools {
    $contentEl = null
    tools = []

    constructor(contentSelector = '') {
        this.$contentEl = $(contentSelector);
        this.getAll();
    }

    async getAll() {
        const resp = await axios.get('data/tools.json');
        this.tools = resp.data || [];

        this.init();
    }

    init() {
        const cols = [[], []];
        const countPerCol = Math.ceil(this.tools.length / cols.length);

        this.tools.forEach((item, i) => {
            const colIndex = i <= countPerCol - 1 ? 0 : 1;
            cols[colIndex].push(renderTool(item));
        });

        this.$contentEl.html(
            `<div class="skills__col ps-5 col-md-5 col-lg-3 ms-auto">${cols[0].join('')}</div>` +
            `<div class="skills__col ps-5 col-lg-3 col-md-5 me-auto">${cols[1].join('')}</div>`
        );
        this.$contentEl.removeClass('loading');
    }
}