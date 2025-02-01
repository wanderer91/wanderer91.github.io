import { renderThumb, renderModal } from "../views/project.js";
import { Modal } from "bootstrap";
import { Fancybox } from "@fancyapps/ui";

export default class Projects {
    $contentEl = null;
    projects = [];

    constructor(contentSelector = "") {
        this.$contentEl = $(contentSelector);
        this.getAll();
    }

    async getAll() {
        const resp = await axios.get("data/projects.json");
        this.projects = (resp.data || []).filter((proj) => !!proj.visible);

        this.init();
    }

    init() {
        const $body = $("body");

        this.projects.forEach((item, i) => {
            this.$contentEl.append(
                renderThumb({
                    thumbSrc: item.thumb,
                    isNew: !!item.isNew,
                    href: `#portfolio-modal-${i + 1}`,
                })
            );
            $body.append(renderModal(item, `portfolio-modal-${i + 1}`));
        });

        this.$contentEl.removeClass("loading");

        $(".project__images").each((projectImagesIndex, projectImages) => {
            $(projectImages)
                .find(".project__images-item")
                .each((projectImagesItemIndex, projectImagesItem) => {
                    const $projectImagesItem = $(projectImagesItem);
                    const imageSrc = $(projectImagesItem).data("src");
                    const $link = $(`<a data-gallery="gallery${projectImagesItemIndex + 1}" href="${imageSrc}"></a>`);

                    $(
                        `<img src="${imageSrc}" class="${$projectImagesItem.data("classes")}" alt="" loading="lazy"/>`
                    ).appendTo($link);
                    $link.appendTo($projectImagesItem);
                });
        });

        this.$contentEl.on("click", ".portfolio-item", (e) => {
            e.preventDefault();
            const $link = $(e.target).closest(".portfolio-item");

            const $modalEl = $($link.attr("href"));
            const modal = new Modal($modalEl[0]);
            $modalEl.data("modal", modal);
            $modalEl.data("modal").show();
        });

        $(document).on("click", "a[data-gallery]", (e) => {
            e.preventDefault();

            const $link = $(e.target).closest("[data-gallery]");
            const $modal = $link.closest(".modal");
            const $allLinks = $modal.find(`a[data-gallery="${$link.attr("data-gallery")}"]`);

            Fancybox.show($allLinks.find("img").clone(), {
                startIndex: $allLinks.index($link),
            });
        });
    }
}
