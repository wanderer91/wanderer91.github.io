export default class CodeBlock {
    elements = null

    constructor(selector = '') {
        this.elements = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        this.elements.forEach((codeBlock) => {
            codeBlock.classList.add('code-block');

            if (codeBlock.dataset.copy === 'false') {
                codeBlock.classList.add('code-block--transparent')
                return;
            }

            codeBlock.innerHTML = `<span class="code-block__text">${codeBlock.innerHTML}</span>`;

            const copyBtn = document.createElement('span');
            copyBtn.classList.add('code-block__copy-btn');
            copyBtn.setAttribute('title', 'Copy');
            copyBtn.innerHTML = '<i class="fa fa-copy"></i>';

            codeBlock.appendChild(copyBtn);
            copyBtn.addEventListener('click', async (e) => {
                const target = e.target;
                const codeBlock = target.closest('.code-block');
                const codeBlockText = codeBlock.querySelector('.code-block__text');

                const chunks = codeBlockText.innerHTML.split(/\n|\r|\r\n/).filter((s) => !!s.trim()); 
                const text = chunks.map((s) => {
                    return s.trim().replace(/<br\s*\/?>/g, '').replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ');
                }).join('\n');

                await navigator.clipboard.writeText(text);

                target.classList.remove('fa-copy');
                target.classList.add('fa-check');
            });
        });
    }
}