describe("test setup", function() {
  it("installs the extension from the src/ dir", function(){
    // The correct (bit chrome intern) url for the installed extensions is
    // not chrome://extensions but this:
    browser.get("chrome://extensions-frame/");

    // Find all extension titles and filter them for the manifest.name title.
    element.all(by.css(".extension-title")).filter(function(extTitleElement) {
      return extTitleElement.getText().then(function(text) {
        return text === manifest.name;
      });
    }).then(function(foundEls) {
      expect(foundEls.length).to.eq(1);
    });
  });

  it("starts a simple webserver on port 8889", function(){
    Tests.visit("simple");
    expect(browser.getTitle()).to.eventually.eq("Form-O-Fill Testpage");
  });

  // After implementing Tests.importRules() -> get -> chrome:// -> clear + save
  // uncomment:
  it("shows data send by the extension", function(){
    Tests.visit("simple");
    expect($(".extension-id").getText()).to.eventually.match(/[a-z0-9]{32}/);
    expect($(".tab-id").getText()).to.eventually.match(/[0-9]+/);
    //expect($(".extension-version").getText()).to.eventually.match(/[0-9]+/);
    expect($(".testing-mode").getText()).to.become("true");
    //expect($(".browser-action-badge-text").getText()).to.become("7");
    //expect($(".matching-rules-count").getText()).to.become("7");
    //expect($(".popup-html").getInnerHtml()).to.eventually.match(/<h3>Found 7 matching rules<\/h3>/);
  });


});
