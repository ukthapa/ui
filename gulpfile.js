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



//**********************************************
//
// DEV TASK
// 
//**********************************************


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
//  Task: Compile stylesheet.sass and save it as stylesheet.css
//  
//////////////////////////////////////////

gulp.task( 'sass.dev', function() {
    gulp.src(assetsURL + "custom-sass/*.scss")
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        })) // report errors w/o stopping Gulp
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({browsers: ['last 3 version']}))
        .pipe( gulp.dest(devUrl + "css") )
        .pipe(sourcemaps.write())
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
//  Task: Copy Bootstrap JS 
//  
//////////////////////////////////////////

gulp.task('copyBootstrapJS', function(){
    gulp.src(assetsURL + "bootstrap/javascripts/bootstrap.min.js")
    .pipe(gulp.dest(devUrl + "vendors"))
    .pipe(reload({stream:true}));
});



///////////////////////////////////////////
//
//  Task: Copy All Vendors File and folders
//  
//////////////////////////////////////////

gulp.task('copyVendors', function(){
    gulp.src(assetsURL + "vendors/*")
    .pipe(gulp.dest(devUrl + "vendors"))
    .pipe(reload({stream:true}));
});



///////////////////////////////////////////
//
//  Task: Copy Custom JS
//  
//////////////////////////////////////////

gulp.task('copyCustomJS', function(){
    gulp.src(assetsURL + "custom-js/*")
    .pipe(gulp.dest(devUrl + "js"))
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
          baseDir: "/Users/Uttam/Work/workflow/ui/dev-theme"
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



//**********************************************
//
// PRODUCTION TASK
// 
//**********************************************

///////////////////////////////////////////
//
//  Task: Copy images to Production Build
//  
//////////////////////////////////////////

gulp.task('copyimages.prod', function () {
    gulp.src(devUrl + 'images/*.{png,jpg,jpeg,gif,svg}')
    .pipe(gulp.dest(prodUrl + "images"));    
});





