document.addEventListener('DOMContentLoaded', () =>{

    document.querySelectorAll('.hover-color').forEach((el) => {

        el.addEventListener('mouseover', () => {

            let color;

            if (!(color = el.dataset.color)) {
                return;
            }

            color = color.trim().match(/^#?([a-zA-Z0-9]{3}|[a-zA-Z0-9]{6})$/)[1];

            document.body.style.backgroundColor = `#${color}`;

        });

    });

});
