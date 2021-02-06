document.addEventListener('DOMContentLoaded', () => {

    document.body.style.backgroundColor = defaultBackColor;

    document.querySelectorAll('.hover-color').forEach((el) => {

        el.addEventListener('mouseover', () => {

            let color;

            if (!(color = el.dataset.color)) {
                return;
            }

            color = color.trim().match(/^#?([a-zA-Z0-9]{3}|[a-zA-Z0-9]{6})$/)[1];

            document.body.style.backgroundColor = `#${color}`;

        });

        el.addEventListener('mouseout', () => {
            document.body.style.backgroundColor = defaultBackColor;
        });

    });

});
