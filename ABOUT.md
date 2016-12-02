# Regulations.gov Comment Widget

Technical specifications
___

### **Widget Initialization**
The closure defined by "RegsgovCommentWidget" is initialized through the init method when widget.js is included as script on the host page. The init method may be called multiple times - depending on how many unique comment forms are embedded on the host page.

### **Build Process**
The project files are managed and built for distribution with NPM and Grunt. Developers will need to run "npm install" (in terminal/command line) to install all required dependencies. Executing "grunt watch" or simply "grunt" will start the process to watch for changes - updating test/production files in "dist" folder and minifying files for local use. All tasks are defined in Gruntfile.js. For local development, the non-minified versions of files in "js" and "theme" folders can be edited.

### **Code Organization**
Widget.js - ModalUtils and FormUtils are 2 larger namespaced modules that contain functions necessary for modal and form function respectively. The other functions that are not modularized, handle binding listeners, checking for and loading jQuery and initializing form creation.
