export default class Modal {
    static attachEvents() {
        document.addEventListener("click", (e) => {
            const dismissModalBtn = e.target.closest('[data-dismiss="modal"]');

            if (!dismissModalBtn) {
                return;
            }

            e.preventDefault();

            const $modalEl = $(e.target).closest(".modal");

            if (!$modalEl.length) {
                return;
            }

            $modalEl.data("modal").hide();
        });
    }
}
