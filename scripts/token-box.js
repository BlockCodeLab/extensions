const tokenBox = {
    name: 'tokenbox',

    level: 'block',

    start (src) {
        const matched = src.match(/^:\[/);
        return matched && matched.index;
    },

    tokenizer (src, tokens) {
        const rule = /^:\[((\w*)\(([^\)]*)\))\s?((\w*)\(([^\)]*)\))?\s?(global\(([^\)]*)\))?\]/i;
        const matched = rule.exec(src);
        if (matched) {
            const result = {
                type: 'tokenbox',
                raw: matched[0],
                inputs: [],
            };
            if (matched[1] && matched[2] && matched[3]) {
                result.inputs.push([matched[2].trim(), matched[3].trim()]);
            }
            if (matched[4] && matched[5] && matched[6]) {
                result.inputs.push([matched[5].trim(), matched[6].trim()]);
            }
            if (matched[7] && matched[8]) {
                result.global = matched[8].trim();
            }
            return result;
        }
    },

    renderer (token) {
        const inputs = [];
        for (const [key, val] of token.inputs) {
            inputs.push(`<div class="prompt_label">${val}</div>` +
                `<div><input class="prompt_input" id="token_${key}" name="${key}" value="" /></div>`);
        }
        return `<p><div class="prompt_body">${inputs.join('')}</div><p>`;
    }
}

module.exports = tokenBox;