export function renderThumb(options = {}) {
    const {thumbSrc = '', isNew = false, href = '#'} = options;
    if (!thumbSrc) {
        return '';
    }


    return `<div class="col-md-6 col-lg-4 portfolio__item${isNew ? ' portfolio__item_new' : ''} position-relative">` +
                `<a class="portfolio-item d-block mx-auto" href="${href}">` +
                    `<div class="portfolio-item-caption d-flex position-absolute h-100 w-100">` +
                        `<div class="portfolio-item-caption-content my-auto w-100 text-center text-white">` +
                            `<i class="fa fa-search-plus fa-3x"></i>` +
                        `</div>` +
                    `</div>` +
                    `<img class="img-fluid" src="${thumbSrc}" alt="" loading="lazy">` +
                `</a>` +
            `</div>`;
}

export function renderModal(data = {}) {
    
}