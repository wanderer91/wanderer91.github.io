import axios from "axios";
import { renderThumb } from "../views/project.js";

export default class Projects {
    $contentEl = null

    constructor($contentEl) {
        this.$contentEl = $contentEl;
        this.$contentEl.addClass('loading');

        this.getAll();
    }

    async getAll() {
        const resp = await axios.get('data/projects.json');
        console.log(resp);
    }
}