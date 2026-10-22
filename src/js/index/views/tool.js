export function renderTool(data = {}) {
    const { title = "", alias = "" } = data;
    return `<div class="skills__card">
                <span class="skills__item-icon skills__item-icon_${alias}" aria-hidden="true"></span>
                <span class="skills__item-text">${title}</span>
            </div>`;
}