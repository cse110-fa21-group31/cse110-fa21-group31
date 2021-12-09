/**
     *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT 
     *  THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR 
     *  PLATFORM OR CMS.
     *  
     *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: 
     *  https://disqus.com/admin/universalcode/#configuration-variables
     */

export const setupDisqusScript = function (id) {
    // console.log("current identifier is ", id)
    var disqus_config = function () {
        // Replace PAGE_URL with your page's canonical URL variable
        this.page.url = "http://localhost:3030/#recipe/" + id;
        // Replace PAGE_IDENTIFIER with your page's unique identifier variable
        this.page.identifier = id;
    };


    (function () {  // REQUIRED CONFIGURATION VARIABLE: EDIT THE SHORTNAME BELOW
        var d = document, s = d.createElement('script');

        // IMPORTANT: Replace EXAMPLE with your forum shortname!
        s.src = 'https://oliveu.disqus.com/embed.js';

        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();

    var reset = function (newIdentifier, newUrl, newTitle, newLanguage) {
        /* eslint-disable no-undef */
        DISQUS.reset({
            reload: true,
            config: function () {
                this.page.identifier = newIdentifier;
                this.page.url = newUrl;
                this.page.title = newTitle;
                this.language = newLanguage;
            }
        });
        /* eslint-enable no-undef */
    };
}