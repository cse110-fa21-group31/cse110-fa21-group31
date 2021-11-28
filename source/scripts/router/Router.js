// Router.js

export class Router {
    /**
     * Sets up the home function. The home function will always be in this.home
     */ 
    constructor(homeCallback) {
        this.home = homeCallback;
    }

    /**
     * Associate a callback to a page name.
     * If the page is visited, the callback will be called.
     * @param {string} pageName - The name of the page.
     * @param {function} callback - The callback to call when the page is visited.
     */
    addPage(pageName, callback) {
        this[pageName] = callback;
    }

    /**
     * Call the callback associated with pageName.
     * This should usually result in a visual change.
     * @param {string} pageName - The name of the page to 'navigate' to (call its callback function).
     * @param {boolean} statePopped - Set to true if you don't want to mutate the history stack.
     */
    navigate(pageName, statePopped) {
        console.log(`navigate() function called, requested pageName: ${pageName}`);
        if (typeof this[pageName] === 'function') {
            let hash;
            if (pageName === 'home') {
                hash = '';
            } else {
                hash = `#${pageName}`;
            }
            if ((!statePopped) && (window.location.hash != hash)) {
                const oldHash = window.location.hash;
                history.pushState({ pageName }, pageName, window.location.href.replace(oldHash, '') + hash);
            }
            this[pageName]();
        }
    }
}