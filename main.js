const extenstionId = location.pathname.split('/').at(-2);
const KEY = `config_${extenstionId}`;
const token = JSON.parse(localStorage.getItem(KEY)) || {};

Object.entries(token).forEach(([key, val]) => {
    const target =  document.getElementById(`config_${key}`);
    if (target) target.value = val;
});

const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('input', handleInput);
});

function handleInput (e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    token[name] = value;
    const tokenStr = JSON.stringify(token);
    localStorage.setItem(KEY, tokenStr);
    setCookie(KEY, tokenStr);
}

function setCookie(key, value) {
    const domain = location.hostname.split('.').slice(-2).join('.');
    document.cookie = `${key}=${encodeURIComponent(value)};path=/;domain=${domain}`;
}
