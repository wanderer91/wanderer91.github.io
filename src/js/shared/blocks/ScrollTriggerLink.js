import { Collapse } from "bootstrap";

export default class ScrollTriggerLink {
    static attachEvents() {
        document.addEventListener("click", (e) => {
            const scrollTriggerLink = e.target.closest('.js-scroll-trigger[href*="#"]');

            if (!scrollTriggerLink) {
                return;
            }

            e.preventDefault();

            if (
                location.pathname.replace(/^\//, "") == scrollTriggerLink.pathname.replace(/^\//, "") &&
                location.hostname == scrollTriggerLink.hostname
            ) {
                var target = document.querySelector(scrollTriggerLink.hash);
                target = target || document.querySelector(`[name="${scrollTriggerLink.hash.slice(1)}"]`);
                if (target) {
                    $("html, body").animate(
                        {
                            scrollTop: $(target).offset().top - 70,
                        },
                        300
                    );
                }
            }

            if (document.querySelector("#navbarResponsive")) {
                const navbarResponsive = new Collapse("#navbarResponsive", {
                    toggle: false,
                });
                navbarResponsive.hide();
            }
        });
    }
}
