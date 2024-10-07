export default class Tools {
    $contentEl = null
    demos = []

    constructor(contentSelector = '') {
        this.$contentEl = $(contentSelector);
        this.getAll();
    }

    async getAll() {
        const resp = await axios.get('data/demo.json');
        this.demos = resp.data || [];

        this.init();
    }

    init() {
        this.demos.forEach((demo) => {
            this.$contentEl.append(`<div class="demo__item">` + 
                `<a href="${demo.url}">${demo.title}</a>` +
                `</div>`);
        });

        this.$contentEl.removeClass('loading');
    }
}