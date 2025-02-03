export function renderThumb(options = {}) {
    const { thumbSrc = "", isNew = false, href = "#" } = options;
    if (!thumbSrc) {
        return "";
    }

    return (
        `<div class="col-md-6 col-lg-4 portfolio__item${isNew ? " portfolio__item_new" : ""} position-relative">` +
        `<a class="portfolio-item d-block mx-auto" href="${href}">` +
        `<div class="portfolio-item-caption d-flex position-absolute h-100 w-100">` +
        `<div class="portfolio-item-caption-content my-auto w-100 text-center text-white">` +
        `<i class="fa fa-search-plus fa-3x"></i>` +
        `</div>` +
        `</div>` +
        `<img class="img-fluid" src="${thumbSrc}" alt="" loading="lazy">` +
        `</a>` +
        `</div>`
    );
}

export function renderModal(data = {}, id = "") {
    return `<div class="portfolio-modal project modal fade" id="${id}">
                <div class="modal-dialog portfolio-modal-dialog bg-white project__modal">
                    <a class="close-button d-none d-md-block portfolio-modal-dismiss project__close-button" href="#" data-dismiss="modal">
                        <i class="fa fa-3x fa-times project__close-button-icon"></i>
                    </a>
                    <div class="container text-center project__container">
                        <div class="row project__row">
                            <div class="col-lg-8 mx-auto project__row-block">
                                <h2 class="text-secondary text-uppercase mb-0 project__title">
                                    ${data.title}
                                </h2>
                                <p class="mb-5 project__description mt-4">${data.description.join("<br>")}</p>
                                <div class="project__images">
                                    ${data.images
                                        .map((imgData) => {
                                            const imgList = imgData.list;
                                            return imgList.length
                                                ? `<div class="project__images-item project__images-item_${
                                                      imgData.device
                                                  }"
                                                    data-src="${imgList[0]}"
                                                    data-classes="img-fluid mb-5 project__screenshot project__screenshot_${
                                                        imgData.device
                                                    }">
                                                    <div class="project__resolution">
                                                        <i class="fa fa-${imgData.device}"></i>
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
                                <a class="btn btn-primary btn-lg rounded-pill portfolio-modal-dismiss" href="#" data-dismiss="modal">
                                    <i class="fa fa-close"></i>
                                    Close
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}
