///////////////////////////////////////////
//
//	Required Plugins
//	
//////////////////////////////////////////

var gulp            = require( 'gulp' ),
    sass            = require( 'gulp-sass' ),
    browserSync     = require( 'browser-sync' ),
    reload          = browserSync.reload,
    sequence        = require( 'run-sequence' ),
    plumber         = require( 'gulp-plumber' ),
    gutil           = require( 'gulp-util' ),
    clean           = require('gulp-clean'),
    sourcemaps      = require('gulp-sourcemaps'),
    autoprefixer    = require( 'gulp-autoprefixer' ), // Prefix CSS for different browser 
    imagemin        = require( 'gulp-imagemin' ); // Optimize the image;



///////////////////////////////////////////
//
//  Path 
//  
//////////////////////////////////////////

var assetsURL       = "./app/", 
    devUrl          = "./dev-theme/",
    prodUrl         = "./prod-theme/";


///////////////////////////////////////////
//
//  Task: Optimize image
//  
//////////////////////////////////////////

gulp.task('imgoptimize.dev', function () {
    gulp.src(assetsURL + 'raw-images/*.{png,jpg,jpeg,gif,svg}')
    .pipe(imagemin())
    .pipe(gulp.dest(devUrl + "images"));    
});


///////////////////////////////////////////
//
//  Task: Copy images to Production Build
//  
//////////////////////////////////////////

gulp.task('copyimages.prod', function () {
    gulp.src(devUrl + 'images/*.{png,jpg,jpeg,gif,svg}')
    .pipe(gulp.dest(prodUrl + "images"));    
});


///////////////////////////////////////////
//
//  Task: Compile stylesheet.sass and save it as stylesheet.css
//  
//////////////////////////////////////////

gulp.task( 'sass.dev', function() {
    gulp.src(assetsURL + "custom-sass/*.scss")
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        })) // report errors w/o stopping Gulp
        .pipe(sass())
        .pipe(autoprefixer({browsers: ['last 3 version']}))
        .pipe( gulp.dest(devUrl + "css") )
        .pipe(reload({stream:true}));
});



///////////////////////////////////////////
//
//  Task: HTML 
//  
//////////////////////////////////////////

gulp.task( 'html.dev', function() {
    gulp.src(assetsURL + "*.html")
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        })) // report errors w/o stopping Gulp   
        .pipe( gulp.dest(assetsURL) )
        .pipe(reload({stream:true}));
});


///////////////////////////////////////////
//
//  Task: Browser-Sync
//  
//////////////////////////////////////////

gulp.task( 'browserSync', function() {
    browserSync.init([devUrl + 'css/*.css',  devUrl + '*.html'], {
        server: {
          baseDir: devUrl
        }
    }); 
});



///////////////////////////////////////////
//
//  Task: Watch
//  
//////////////////////////////////////////

gulp.task('watch', function() {
    gulp.watch(assetsURL + 'custom-sass/*.scss', ['sass.dev']);
    gulp.watch(devUrl + '*.html');
    gulp.watch(devUrl + 'css/*.css');
});



///////////////////////////////////////////
//
//  Task: Default 
//  
//////////////////////////////////////////

gulp.task('default', ['sass.dev', 'browserSync', 'watch']);



