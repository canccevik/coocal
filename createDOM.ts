const { JSDOM } = require('jsdom');
const local_storage = require('dom-storage');

const createDOM = () => {
    global.window = (new JSDOM("")).window;
    global.document = global.window.document;
    global.localStorage = new local_storage("localStorage.json");
}

module.exports = createDOM();
