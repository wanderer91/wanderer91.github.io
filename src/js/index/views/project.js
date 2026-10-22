export function renderThumb(options = {}, maybeHref = "") {
    const thumbSrc = options.thumb || options.thumbSrc || "";
    if (!thumbSrc) {
        return "";
    }

    const isNew = !!options.isNew;
    const href = maybeHref || options.href || "#";
    const title = options.title || "";
    const description = options.description || [];
    const descPreview = description.length ? description[0] : "";

    return (
        `<div class="col-md-6 col-lg-4 portfolio__col d-flex">` +
        `<div class="portfolio-card${isNew ? " portfolio-card_new" : ""} w-100 d-flex flex-column">` +
        `<div class="portfolio-card__image-wrap position-relative">` +
        (isNew ? `<span class="portfolio-card__badge">New</span>` : "") +
        `<a class="portfolio-item portfolio-card__image-link d-block" href="${href}" aria-label="View project details">` +
        `<img class="img-fluid portfolio-card__thumb" src="${thumbSrc}" alt="" loading="lazy">` +
        `<div class="portfolio-card__overlay d-flex align-items-center justify-content-center">` +
        `<span class="btn btn-sm btn-primary rounded-pill"><i class="fa fa-search-plus me-1"></i> View Gallery</span>` +
        `</div>` +
        `</a>` +
        `</div>` +
        `<div class="portfolio-card__body d-flex flex-column flex-grow-1 p-4">` +
        `<h3 class="portfolio-card__title mb-2">${title}</h3>` +
        (descPreview ? `<div class="portfolio-card__desc text-muted mb-3 flex-grow-1">${descPreview}</div>` : "") +
        `<div class="portfolio-card__actions mt-auto pt-2">` +
        `<a class="btn btn-outline-primary btn-sm w-100 portfolio-item" href="${href}">` +
        `<i class="fa fa-folder-open-o me-1"></i> View Details & Gallery` +
        `</a>` +
        `</div>` +
        `</div>` +
        `</div>` +
        `</div>`
    );
}

export function renderModal(data = {}, id = "") {
    return `<div class="portfolio-modal project modal fade" id="${id}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg portfolio-modal-dialog bg-white project__modal">
                    <button type="button" class="close-button portfolio-modal-dismiss project__close-button" data-dismiss="modal" aria-label="Close">
                        <i class="fa fa-times project__close-button-icon" aria-hidden="true"></i>
                    </button>
                    <div class="container-fluid text-center project__container p-0">
                        <div class="row project__row">
                            <div class="col-12 project__row-block">
                                <h2 class="text-secondary project__title mb-3">
                                    ${data.title}
                                </h2>
                                <div class="project__description text-start mx-auto mb-4">
                                    ${data.description.map((line) => `<p class="mb-2">${line}</p>`).join("")}
                                </div>
                                <div class="project__devices-notice mb-4">
                                    <span class="project__notice-pill">
                                        <i class="fa fa-info-circle me-1 text-primary"></i> Click any screenshot below to browse full device gallery
                                    </span>
                                </div>
                                <div class="project__images">
                                    ${data.images
                                        .map((imgData) => {
                                            const imgList = imgData.list;
                                            return imgList.length
                                                ? `<div class="project__images-item project__images-item_${
                                                      imgData.device
                                                  }"
                                                    data-src="${imgList[0]}"
                                                    data-classes="img-fluid project__screenshot project__screenshot_${
                                                        imgData.device
                                                    }"${imgList.length > 1 ? ' title="Click to see all images"' : ""}>
                                                    <div class="project__resolution">
                                                        <i class="fa fa-${imgData.device}"></i>
                                                        <span class="project__resolution-label">${imgData.device}</span>
                                                    </div>
                                                    <div class="d-none project__images-item-gallery">
                                                    ${imgList
                                                        .map((img) => `<img src="${img}" alt="" loading="lazy" />`)
                                                        .join("")}
                                                    </div>
                                                </div>`
                                                : "";
                                        })
                                        .join("")}
                                </div>
                                <div class="project__footer mt-4 pt-3 border-top">
                                    <button type="button" class="btn btn-outline-secondary portfolio-modal-dismiss" data-dismiss="modal">
                                        <i class="fa fa-times me-1"></i> Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}
