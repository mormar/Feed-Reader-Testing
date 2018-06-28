/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('url in feedObject is defined and isn\'t empty', function() {
           allFeeds.forEach(function(feedObject){
             expect(feedObject.url).toBeDefined();
             expect(feedObject.url.length).not.toBe(0);
           });
         });

        /* That loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('name in feedObject is defined and isn\'t empty', function() {
           allFeeds.forEach(function(feedObject){
             expect(feedObject.name).toBeDefined();
             expect(feedObject.name.length).not.toBe(0);
           });
         });

    });


    /* Test suite named "The menu" */
    describe('The menu', function() {
        /* That ensures the menu element is hidden by default. */
         it('is hidden by default', function() {
         expect($('body').hasClass('menu-hidden')).toBe(true);
       });
         /* That ensures the menu changes visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          const iconList = document.getElementsByClassName("icon-list")[0];

          it('changes visibility when the menu icon is clicked', function() {
            iconList.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            iconList.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

    /* Test suite named "Initial Entries" */
      describe('Initial Entries', function() {

        /* That ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         beforeEach(function(done){
           loadFeed(0, done);
         });

         it('loadFeed function is called and completes its work', function() {
           let feedLength = $('.feed .entry').length;
           expect(feedLength).toBeGreaterThan(0);
         });
      });

    /* Test suite named "New Feed Selection" */
      describe('New Feed Selection', function() {

        /* That ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         let articleBefor;
         let articleAfter;

         beforeEach(function(done){
           loadFeed(0, function () {
             articleBefor = $('.feed').html();
             loadFeed(1, function () {
               articleAfter = $('.feed').html();
               done();
             })
           })
         });

         it('causes change of content', function() {
           expect(articleBefor).not.toBe(articleAfter);
         });
       });
}());
