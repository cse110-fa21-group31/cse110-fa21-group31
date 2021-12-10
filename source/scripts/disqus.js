/**
 *  This is the script function to setup the embeded disqus component
 * @param id the recipeId to help disqus identify which comment thread it should present
 */
export const setupDisqusScript = function (id) {
    //set up the disqus configuration variable. The url is deprecrated, but the identifer
    //is used to let disqus generate new thread for a different recipe/fetch existing comment thread
    //for the same recipe
    var disqus_config = function () {
        // Replace PAGE_URL with your page's canonical URL variable
        this.page.url = "http://localhost:3030/#recipe/" + id;
        // Replace PAGE_IDENTIFIER with your page's unique identifier variable
        this.page.identifier = id;
    };
    //this set up the disqus component. Disqus will take care of making any http request/render results afterward
    (function () {
        // create an script element for the index.html
        var d = document,
            s = d.createElement("script");

        // this is the src url for our project
        s.src = "https://oliveu.disqus.com/embed.js";

        s.setAttribute("data-timestamp", +new Date());
        (d.head || d.body).appendChild(s);
    })();

    //set up the process when we're trying to reset the disqus comment
    var reset = function (newIdentifier, newUrl, newTitle, newLanguage) {
        /* eslint-disable no-undef */
        DISQUS.reset({
            reload: true,
            config: function () {
                this.page.identifier = newIdentifier;
                this.page.url = newUrl;
                this.page.title = newTitle;
                this.language = newLanguage;
            },
        });
        /* eslint-enable no-undef */
    };
};
