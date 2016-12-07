# Regulations.gov Comment Widget

Comment widget that is accessible to the public to embed on webpages.
___

### **Background**
Currently, media channels and other interested parties referring to a Rule/Notice only have the option to provide the public with  Regulations.gov homepage link instead of linking to the specific comment form page. Providing the interested parties with a widget  will make it easier for the public to submit comments to the specific ruling mentioned in the articles, blog or other types of  webpages.

### **Usage**
The associated files are hosted via CDN. Embed code is generated once a registered user provides:

- API Key
- Document ID


Example of modal trigger code:
``` html
  <button id="regsgov-trigger">Comment Now!</button>
```

1) Example of form embed code (with data attributes):
``` html
  <script src="https://cdn.jsdelivr.net/regsgov-comment-widget/latest/widget.min.js"></script>
  <div id="regsgov-widget" data-apikey="DEMO_KEY" data-docid="DARS_FRDOC_0001-0926" style="display: none;"/>
```


Include data attributes to be parsed by widget.min.js. This setup is ideal for clients who have  relatively simple requirements (display one trigger & comment form on page) and whose CMS will allow for data attributes in the DOM.


2) Example of form embed code (with options):
``` javascript
  <script src="https://cdn.jsdelivr.net/regsgov-comment-widget/latest/widget.min.js"></script>
  <script>  window.onload = function(){
      RegsgovCommentWidget.init({apikey: "DEMO_KEY",
      docid: "DARS_FRDOC_0001-0926",
      triggerElement: "#regsgov-trigger"});
  </script>
```

  Include an options object to be parsed by widget.min.js. This setup is ideal for more complex requirements in which, clients need to display more than one unique trigger & comment form per page. Multiple forms referring to different FR documents can be embedded. Although, only one modal window can be displayed at a time. This usage is also good for clients whose CMS does not allow for data attributes in the DOM.


### **Notes on usage**
The embedded div code cannot be child to a div (from the host page) that has style set to "overflow:hidden" as it will cause the widget to be clipped.
The modal trigger code can be placed anywhere but, the embedded div must be placed in a parent div that does not have overflow set to hidden.
