export function renderTool(data = {}) {
    const {title = '', alias = ''} = data;
    return `<div class="d-flex align-items-center mt-3 mb-3 skills__item">
                <span class="d-inline-block skills__item-icon skills__item-icon_${alias}"></span>
                <span class="d-inline-block skills__item-text">${title}</span>
            </div>`;
}