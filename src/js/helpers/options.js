export default function (el, options = []) {
    let optionValues = {};

    if (!el) {
        return optionValues;
    }

    options.forEach((option) => {
        const lowerOptionName = option.name.replace(/([A-Z])/g, '-$1');
        optionValues[option.name] = el.dataset[option.name] ? el.dataset[option.name]
            : (el.getAttribute(option.name) || el.getAttribute(lowerOptionName)
                || el.getAttribute(`data-${lowerOptionName}`) || option.default);
    });

    return optionValues;
}
