import '../../scss/blocks/mouse-color.scss';

document.addEventListener('DOMContentLoaded', function () {

    let colorBlocks = document.querySelectorAll('.mouse-color') || [];
    let colorBlocksData = [];
    let changeColorTimeout, angle = 0;

    function getParentbyClassName(elem, className) {

        while (elem.parentNode) {

            if (elem.parentNode.classList && elem.parentNode.classList.contains(className)) {

                return elem.parentNode;
            }

            elem = elem.parentNode;

        }

        return false;

    }

    function colorAllocation(colors, rotateDir) {

        const angle = 360 / colors.length;

        if (rotateDir < 0) {
            colors = colors.reverse();
        }

        return colors.map((color, i) => {
            return {value: color, angle: angle * i}
        });

    }

    function hexToRgb(hex) {

        const alph = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15};
        let rgb = [];

        for (let i = 0; i < 6; i += 2) {

            const hexNumber = hex.substring(i, i + 2);
            let dec = 0;

            for (let j = 0; j < hexNumber.length; j++) {

                dec += parseInt(alph[hexNumber[j].toLowerCase()]) * Math.pow(16, hexNumber.length - j - 1);

            }

            rgb.push(dec);
        }

        return rgb;

    }

    function betweenLinesAngle(line1, line2) {

        const num = (line1.A * line2.A + line1.B * line2.B);
        const delim = Math.sqrt(line1.A ** 2 + line1.B ** 2) * Math.sqrt(line2.A ** 2 + line2.B ** 2);

        const phiRadians = Math.acos(num / delim);

        return phiRadians * 180 / Math.PI;
    }

    function findColorRange(angle, blockIndex) {

        const blockColors = colorBlocksData[blockIndex].colors;

        for (let i = 0; i < blockColors.length; i++) {
            if (blockColors[i].angle > angle) {
                continue;
            }

            const nextAngleIndex = i < blockColors.length - 1 ? i + 1 : 0;
            const nextAngle = i < blockColors.length - 1 ? blockColors[i + 1].angle : 360;

            if (blockColors[i].angle <= angle && nextAngle >= angle) {

                return [
                    {angle: blockColors[i].angle, rgb: hexToRgb(blockColors[i].value)},
                    {angle: nextAngle, rgb: hexToRgb(blockColors[nextAngleIndex].value)}
                ];

            }
        }

    }

    function calcColor(event, block, index, mouseXOnBlock, mouseYOnBlock, triggerBlocks = true) {

        let parent;

        if (parent = getParentbyClassName(block, 'mouse-color')) {
            block = parent;
        }

        if (event) {

            event = event.type === 'touchmove' ? event.targetTouches[0] : event;

            if (!mouseXOnBlock) {
                mouseXOnBlock = event.clientX - colorBlocksData[index].rect.left;
            }

            if (!mouseYOnBlock) {
                mouseYOnBlock = event.clientY - colorBlocksData[index].rect.top;
            }

        }

        const blockMiddleX = block.offsetWidth / 2;
        const blockMiddleY = block.offsetHeight / 2;

        let angle = betweenLinesAngle(
            {A: mouseYOnBlock - blockMiddleY, B: blockMiddleX - mouseXOnBlock},
            {A: -blockMiddleY, B: 0},
        );

        angle = mouseXOnBlock < blockMiddleX ? 360 - angle : angle;

        const colorRange = findColorRange(angle, index);
        const ratio = Math.abs(angle - colorRange[0].angle) / Math.abs(colorRange[1].angle - colorRange[0].angle);

        const r = colorRange[0].rgb[0] + Math.round((colorRange[1].rgb[0] - colorRange[0].rgb[0]) * ratio);
        const g = colorRange[0].rgb[1] + Math.round((colorRange[1].rgb[1] - colorRange[0].rgb[1]) * ratio);
        const b = colorRange[0].rgb[2] + Math.round((colorRange[1].rgb[2] - colorRange[0].rgb[2]) * ratio);

        block.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        if (triggerBlocks) {
            colorBlocks.forEach((colorBlock, i) => {
                if (i !== index) {
                    calcColor(
                        event,
                        colorBlock,
                        i,
                        mouseXOnBlock * colorBlock.offsetWidth / block.offsetWidth,
                        mouseYOnBlock * colorBlock.offsetHeight / block.offsetHeight,
                        false
                    );
                }
            })
        }
    }

    function attachColorBlockEvents(block, index) {

        block.addEventListener("mousemove", (event) => {
            stopChangeColor();
            calcColor(event, event.target, index);
        });
        block.addEventListener("touchmove", (event) => {
            stopChangeColor();
            calcColor(event, event.target, index);
        });

        block.addEventListener("mouseout", (event) => {
            launchChangeColor(colorBlocks[0], 0);
        });
        block.addEventListener("touchend", (event) => {
            launchChangeColor(colorBlocks[0], 0);
        });

    }

    function launchChangeColor (block, index) {

        angle += 5;
        angle = angle >= 360 ? angle - 360 : angle;

        calcColor(
            null,
            block,
            index,
            block.offsetWidth / 2 + block.offsetWidth / 3 * Math.sin(angle * Math.PI / 180),
            block.offsetHeight / 2 - block.offsetHeight / 3 * Math.cos(angle * Math.PI / 180)
        );

        changeColorTimeout = setTimeout(() => {

            launchChangeColor(block, index);

        }, 50);

    }

    function stopChangeColor() {

        clearTimeout(changeColorTimeout);

    }

    function initColorBlocks() {

        colorBlocks.forEach((colorBlock, i) => {

            let colors = colorBlock.dataset.colors;

            if (!colors) {

                return;

            }

            colors = colorBlock.dataset.colors.trim().split(/\s*,\s*/);

            if (!colors.length) {
                return;
            }

            const rotateDir = parseInt(colorBlock.dataset.rotateDir);

            colorBlocksData[i] = {
                colors: colorAllocation(colors, rotateDir),
                rect: colorBlock.getBoundingClientRect(),
                rotateDir: rotateDir
            };

            colorBlock.style.backgroundColor = `#${colors[Math.floor(Math.random() * colors.length)]}`;

            attachColorBlockEvents(colorBlock, i);

        });

    }

    //initColorBlocks();

    //launchChangeColor(colorBlocks[0], 0);

});
