document.addEventListener('DOMContentLoaded', () => {

    const blotterScript = document.createElement('script');
    blotterScript.src = 'vendor/js/blotter.min.js';
    blotterScript.addEventListener('load', drawLiquidText);
    document.body.appendChild(blotterScript);

    const liquidTextSelector = '.liquid-text';
    const liquidTextContentSelector = '.liquid-text__content';

    const elem = document.querySelector(liquidTextSelector);
    const textEl = elem.querySelector(liquidTextContentSelector);

    let angle = 0, mousePos = {}, pointRotatingTimeout = null, mouseMoving = false;

    const elemPointRotating = () => {

        if (angle >= 360) {

            angle = 360 - angle;

        }

        angle += 0.1;

        mousePos.x = window.innerWidth / 2 * (1 + Math.sin(angle * Math.PI / 180));
        mousePos.y = window.innerHeight / 2 * (1 + Math.cos(angle * Math.PI / 180));

        pointRotatingTimeout = setTimeout(elemPointRotating);

    };

    function drawLiquidText() {

        alert('start drawing');

        try {
            Blotter.LiquidDistortMaterial = function() {
                Blotter.Material.apply(this, arguments);
            };

            Blotter.LiquidDistortMaterial.prototype = Object.create(Blotter.Material.prototype);

            Blotter._extendWithGettersSetters(Blotter.LiquidDistortMaterial.prototype, (function () {

                function _mainImageSrc () {
                    return [
                        Blotter.Assets.Shaders.Noise3D,

                        "void mainImage( out vec4 mainImage, in vec2 fragCoord )",
                        "{",
                        "    // Setup ========================================================================",

                        "    vec2 uv = fragCoord.xy / uResolution.xy;",
                        "    float z = uSeed + uGlobalTime * uSpeed;",

                        "    uv += snoise(vec3(uv, z)) * uVolatility;",

                        "    mainImage = textTexture(uv);",

                        "}"
                    ].join("\n");
                }

                return {

                    constructor : Blotter.LiquidDistortMaterial,

                    init : function () {
                        this.mainImage = _mainImageSrc();
                        this.uniforms = {
                            uSpeed : { type : "1f", value : 1.0 },
                            uVolatility : { type : "1f", value : 0.15 },
                            uSeed : { type : "1f", value : 0.1 }
                        };
                    }
                };

            })());

            const body = document.body;
            const docEl = document.documentElement;

            const MathUtils = {
                lineEq: (y2, y1, x2, x1, currentVal) => {
                    // y = mx + b
                    var m = (y2 - y1) / (x2 - x1),
                        b = y1 - m * x1;
                    return m * currentVal + b;
                },
                lerp: (a, b, n) => (1 - n) * a + n * b,
                distance: (x1, x2, y1, y2) => {
                    var a = x1 - x2;
                    var b = y1 - y2;
                    return Math.hypot(a, b);
                }
            };

            let winsize;
            const calcWinsize = () =>
                (winsize = { width: window.innerWidth, height: window.innerHeight });

            calcWinsize();
            window.addEventListener("resize", calcWinsize);

            const getMousePos = ev => {
                let posx = 0;
                let posy = 0;
                if (!ev) ev = window.event;
                if (ev.pageX || ev.pageY) {
                    posx = ev.pageX;
                    posy = ev.pageY;
                } else if (ev.clientX || ev.clientY) {
                    posx = ev.clientX + body.scrollLeft + docEl.scrollLeft;
                    posy = ev.clientY + body.scrollTop + docEl.scrollTop;
                }
                return { x: posx, y: posy };
            };

            mousePos = { x: winsize.width / 2, y: winsize.height / 2 };

            const moveHandler = (ev) => {
                mousePos = getMousePos(ev);

                clearTimeout(pointRotatingTimeout);

                pointRotatingTimeout = setTimeout(elemPointRotating, 0);
            };

            window.addEventListener("mousemove", moveHandler);
            window.addEventListener("touchmove", moveHandler);

            const createBlotterText = () => {
                const text = new Blotter.Text(textEl.innerHTML, {
                    family: "sans-serif",
                    weight: 700,
                    size: elem.dataset.fontSize,
                    paddingLeft: 100,
                    paddingRight: 100,
                    paddingTop: 100,
                    paddingBottom: 100,
                    fill: elem.dataset.fillColor
                });
                elem.removeChild(textEl);

                const material = new Blotter.LiquidDistortMaterial();
                material.uniforms.uSpeed.value = 1;
                material.uniforms.uVolatility.value = 0;
                material.uniforms.uSeed.value = 0.1;
                const blotter = new Blotter(material, { texts: text });
                const scope = blotter.forText(text);
                scope.appendTo(elem);

                let lastMousePosition = { x: winsize.width / 2, y: winsize.height / 2 };
                let volatility = 0;

                const render = () => {
                    const docScrolls = {
                        left: body.scrollLeft + docEl.scrollLeft,
                        top: body.scrollTop + docEl.scrollTop
                    };
                    const relmousepos = {
                        x: mousePos.x - docScrolls.left,
                        y: mousePos.y - docScrolls.top
                    };
                    const mouseDistance = MathUtils.distance(
                        lastMousePosition.x,
                        relmousepos.x,
                        lastMousePosition.y,
                        relmousepos.y
                    );

                    volatility = MathUtils.lerp(
                        volatility,
                        Math.min(MathUtils.lineEq(0.9, 0, 100, 0, mouseDistance), 0.9),
                        0.05
                    );
                    material.uniforms.uVolatility.value = volatility;

                    lastMousePosition = { x: relmousepos.x, y: relmousepos.y };
                    requestAnimationFrame(render);
                };
                requestAnimationFrame(render);
            };

            pointRotatingTimeout = setTimeout(elemPointRotating, 0);

            createBlotterText();
        } catch (e) {

            alert(e.message);

        }


    }

});
