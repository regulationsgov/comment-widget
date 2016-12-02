
module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    cssnano: {
      options: {
          sourcemap: false
      },
      build: {
        src: './theme/default.css',
        dest: './theme/default.min.css'
      }
    },

    htmlmin: {
        options: {
           removeComments: true,
           collapseWhitespace: true
        },
        build: {
          files :[{
            src: './theme/default.html',
            dest: './theme/default.min.html'
          }]
        }
    },

    uglify: {
      options: {
        quoteStyle: 3,
        mangle: false,
        banner: '/*!Built <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: './js/widget.js',
        dest: './js/widget.min.js'
      }
    },

    replace: {
      test : {
        options : {
          patterns: [
            {
              match: /http:\/\/localhost\//g,
              replacement: 'https://test-widget.regulations.gov/'
            }
          ]
        },
        files: [
         {
           './test/': ['js/widget.min.js', 'index.html']
         }
       ]
      },
     prod : {
       options : {
         patterns: [
           {
             match: /http:\/\/localhost\//g,
             replacement: 'https://cdn.jsdelivr.net/regsgov-comment-widget/latest/'
           },
           {
             match: /https:\/\/api.data.gov\/TEST\/regulations\/v3\//g,
             replacement: 'https://api.data.gov/regulations/v3/'
           },
           {
             match: /https:\/\/test.regulations.gov\//g,
             replacement: 'https://www.regulations.gov/'
           },
           {
             match: /https:\/\/test-widget.regulations.gov/g,
             replacement: 'https://cdn.jsdelivr.net/regsgov-comment-widget/latest'
           }
         ]
       },
       files: [
        {
          './dist/': ['js/widget.min.js', 'theme/default.min.html']
        }
      ]
    },

    inline: {
      options : {
        patterns: [
          {
            match: 'defaultcss',
            replacement: '<%= grunt.file.read(\'./theme/default.min.css\') %>'
          },
          {
            match: 'defaulthtml',
            replacement: '<%= grunt.file.read(\'./theme/default.min.html\') %>'
          }
        ]
      },
      files: [
       {
         './js/widget.min.js': './js/widget.min.js',
       }
     ]
    }
   },

   copy: {
    test : {
    files: [
      { src:'images/*', dest:'test/' }
      ]
    },
    prod : {
    files: [
      { src:'images/*', dest:'dist/' },
      { src:'theme/default.min.css', dest:'dist/'}
      ]
    }
  },

   clean: ['dist/*'],

   eslint: {
      target: ['js/widget.js']
   },

   purifycss: {
      options: {},
      target: {
        src: ['theme/default.html', 'js/widget.js'],
        css: ['theme/default.css'],
        dest: 'tmp/default.pure.css'
      },
    },

    watch: {
      scripts: {
        files: ['./js/widget.js', './index.html', './theme/default.css', './theme/default.html', './Gruntfile.js'],
        tasks: ['build', 'buildall'],
        options: {
          spawn: false,
        },
      },
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-uglify'); // Minify javascript
  grunt.loadNpmTasks('grunt-eslint'); // Error reporting in console
  grunt.loadNpmTasks('grunt-replace'); // Replace local host variables for dist
  grunt.loadNpmTasks('grunt-cssnano'); // Minify CSS
  grunt.loadNpmTasks('grunt-contrib-clean'); // Cleans files and folders
  grunt.loadNpmTasks('grunt-purifycss');
  grunt.loadNpmTasks('grunt-contrib-watch'); // Watches file changes - executes tasks
  grunt.loadNpmTasks('grunt-contrib-copy'); // Copies files
  grunt.loadNpmTasks('grunt-contrib-htmlmin'); // Minifies html


  // Default task(s).
  grunt.registerTask('default', ['watch']);

  // Build tasks: all, test and prod -- usage: "grunt buildall"
  grunt.registerTask('build', ['cssnano', 'htmlmin', 'uglify', 'replace:inline']);
  grunt.registerTask('test', ['clean', 'replace:test', 'copy:test', 'eslint']);
  grunt.registerTask('prod', ['clean', 'replace:prod', 'copy:prod', 'eslint']);
  grunt.registerTask('buildall', ['clean', 'build', 'copy', 'replace:test', 'replace:prod', 'eslint']);
};
