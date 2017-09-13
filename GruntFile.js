module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			files: ["*.js", "lib/*.js", "test/*.js"],
			options: {
				esnext: true,
				globals: {
					jQuery: true
				}
			}
		},		
		less: {
			production: {
				files: {
					"public/css/style.css": ["public/lib/css/less/*.less","public/lib/css/*.css"],
         		}
			}
		},
		autoprefixer: {
			    files: {
                    'public/css/style.css': 'public/css/style.css',
                }
		},
		browserify: {
			client: {
				src: ["public/lib/js/printTerms.js"],
				dest: "public/js/bundle.js"
			}
		},
        watch: {
			css: {
				files: ["public/lib/css/*.css","public/lib/css/less/*.less"],
				tasks: ["css"]
			},
			scripts: {
				files: ["public/lib/js/printTerms.js"],
				tasks: ["jshint", "browserify"]
			}
		}

	});

    //Load Tasks
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-autoprefixer");
	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	
    //Register Tasks
	grunt.registerTask("js", ["browserify"]);
	grunt.registerTask("css", ["less","autoprefixer"]);
	grunt.registerTask("default", ["jshint","css","js"]);

};