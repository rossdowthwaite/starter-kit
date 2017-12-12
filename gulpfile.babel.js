import gulp         from 'gulp' ;
import sourcemaps   from 'gulp-sourcemaps' ;        // https://www.npmjs.com/package/gulp-sourcemaps

/* ==============================================
 * 			Sass and compilation stuff
 */
import autoprefixer from 'gulp-autoprefixer';       // npm install --save-dev gulp-autoprefixer
import concat       from 'gulp-concat' ;            // https://www.npmjs.com/package/gulp-concat
import sass         from 'gulp-sass' ;


/* ==============================================
 * 				Local server
 */
import serve        from 'gulp-serve' ;             // https://www.npmjs.com/package/gulp-serve
import browserSync  from 'browser-sync';            // https://www.npmjs.com/package/browser-sync
browserSync.create();


/* ==============================================
 * 				Compress Images
 */
import imagemin     from 'gulp-imagemin';           // https://www.npmjs.com/package/gulp-imagemin
import pngquant     from 'imagemin-pngquant';       // https://www.npmjs.com/package/imagemin-pngquant

/* ==============================================
 * 					Minify
 */
import uglify       from 'gulp-uglify' ;            // https://www.npmjs.com/package/gulp-uglify
import minifyCss    from 'gulp-minify-css' ;        // https://www.npmjs.com/package/gulp-minify-css
import minifyHTML   from 'gulp-minify-html';        // https://www.npmjs.com/package/gulp-minify-html
import rename       from 'gulp-rename';             // https://www.npmjs.com/package/gulp-rename
import babel        from 'gulp-babel';
import minify       from 'gulp-babel-minify';

/* ==============================================
 * 					Browserify
 */
import browserify from "browserify";                   // https://www.npmjs.com/package/browserify
import source from "vinyl-source-stream";              // https://www.npmjs.com/package/vinyl-source-stream
import buffer from "vinyl-buffer";                     // https://www.npmjs.com/package/vinyl-buffer
import fs from "fs";
let gulpBrowser = require("gulp-browser");

/* ==============================================
 * 					Templating
 */
import nunjucksRender from "gulp-nunjucks-render";
import htmlbeautify from 'gulp-html-beautify';

const servePath = './src';
const base_path = './src';
const dist = './dist';
const assets = base_path + '/assets';

const node_path = './node_modules';

const compiled = {
  js: 'main.js',
  js_min: 'main.min.js',
  js_vendor: 'vendor.js',
  css: 'main.css'
}

const sourcePaths = {
  html: './src/*.html',
  njk_pages: assets + '/nunjucks/pages/**/*.+(html|njk)',
  njk_templates: assets + '/nunjucks/templates',
  js: assets + '/js/custom/*.js',
  js_modules: assets + '/js/custom/modules/*.js',
  css: assets + '/css',
  scss: [
      assets + '/scss/*.scss',
      assets + '/scss/**/*.scss',
      assets + '/scss/**/**/*.scss'
    ],
  icons: assets + '/icons/**/*',
  fonts: assets + '/fonts/**/*',
  img: assets + '/img/*',
  svg: assets + '/icons/*.svg',
  node_modules: [
    node_path + '/nunjucks/browser/nunjucks.min.js',
  ]
}

const destPaths = {
  js: assets + '/js',
  css: assets + '/css',
  icons: assets + '/icons',
  fonts: assets + '/fonts',
  img: assets + '/img'
}

const buildPaths = {
  js: dist + '/assets/js',
  css: dist + '/assets/css',
  icons: dist + '/assets/icons',
  fonts: dist + '/assets/fonts',
  img: dist + '/assets/img',
  html: dist,
}


const transforms = [
    {
        transform: "babelify",
        options: {presets: ["es2015"]}
    }
];

var beautifyOptions = {
   indentSize: 1
 };


/* ------------------------------------------------------------
//     JS
// ------------------------------------------------------------ */

gulp.task( 'js:compile', () => {

  return gulp.src( sourcePaths.js )
    .pipe( sourcemaps.init() )
    .pipe( concat( compiled.js ) )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest( destPaths.js ) )
} );


gulp.task('js:modules', ['js:compile'], () => {
    return gulp.src( destPaths.js + '/' + compiled.js )
      .pipe( gulpBrowser.browserify( transforms ) )
      .pipe( gulp.dest( destPaths.js ) )
});


gulp.task( 'js:minify', ['js:modules'], () => {

  return gulp.src( destPaths.js + '/' + compiled.js )
    .pipe( rename( compiled.js_min ))
    .pipe(minify({
      mangle: {
        keepClassName: true
      }
     }))
    .pipe( gulp.dest( destPaths.js ) )
    .pipe( browserSync.stream() );
});


gulp.task( 'js:vendor', ['js:minify'], () => {

    return gulp.src( sourcePaths.node_modules )
      .pipe( concat( compiled.js_vendor ) )
      .pipe( gulp.dest( destPaths.js ) )
      .pipe( browserSync.stream() );
} );


gulp.task( 'js:build', () => {
    gulp.src( [ destPaths.js + '/*.js' ] )
      .pipe( gulp.dest( buildPaths.js ) );
})

gulp.task( 'scripts', [ 'js:compile', 'js:modules', 'js:minify', 'js:vendor' ] );


/* ------------------------------------------------------------
//     SASS & CSS
// ------------------------------------------------------------ */

gulp.task( 'scss:compile', () => {

    return gulp.src( sourcePaths.scss )
      .pipe( sourcemaps.init() )
      .pipe( sass().on( 'error', sass.logError ) )
      .pipe( autoprefixer( {
          browsers: [ 'last 2 versions', 'ie > 9' ],
          cascade: false
      } ) )
      .pipe( sourcemaps.write() )
      .pipe( gulp.dest( destPaths.css ) )
      .pipe( browserSync.stream() );
} );

gulp.task( 'scss:compressed', ['scss:compile'], () => {

    return gulp.src( sourcePaths.scss )
      .pipe( sass( {
          outputStyle: 'compressed'
      } ).on( 'error', sass.logError ) )
      .pipe( autoprefixer( {
          browsers: [ 'last 2 versions', 'ie > 9' ],
          cascade: false
      } ) )
      .pipe( gulp.dest( destPaths.css ) )
} );


gulp.task( 'css:build', () => {
    gulp.src( [ destPaths.css + '/*.css' ] )
      .pipe( minifyCss() )
      .pipe( gulp.dest( buildPaths.css ) )
} );

gulp.task( 'sass', [ 'scss:compile', 'scss:compressed' ] );

/* ------------------------------------------------------------
//     LOCAL SERVER
// ------------------------------------------------------------ */

gulp.task( 'serve', [ 'sass', 'scripts' ], () => {
    browserSync.init( {
        server: {
            baseDir: servePath
        }
    } );
    gulp.watch( sourcePaths.js, [ 'scripts' ] );
    gulp.watch( sourcePaths.js_modules, [ 'scripts' ] );
    gulp.watch( sourcePaths.scss, [ 'sass' ] );
    gulp.watch( sourcePaths.icons, [ 'iconfont' ] );
    gulp.watch( sourcePaths.html ).on( 'change', browserSync.reload );
} );


/* ------------------------------------------------------------
//     Templating
// ------------------------------------------------------------ */

gulp.task('nunjucks', function() {

  return gulp.src(sourcePaths.njk_pages)
    .pipe(nunjucksRender({
        path: [sourcePaths.njk_templates]
      }))
    .pipe(htmlbeautify(beautifyOptions))
    .pipe(gulp.dest(base_path))
});


/* ------------------------------------------------------------
//     BUILD
// ------------------------------------------------------------ */

gulp.task( 'build', [ 'html', 'js:build', 'css:build', 'images:build', 'fonts' ] )


gulp.task( 'fonts', () => {

  gulp.src( sourcePaths.fonts )
    .pipe( gulp.dest( buildPaths.fonts ) );
} );


gulp.task( 'html', () => {

  gulp.src( [ sourcePaths.html ] )
    .pipe( gulp.dest( dist ) );
} );

gulp.task ( 'images:build', () => {
  return gulp.src( sourcePaths.img )
    .pipe( imagemin({
      progressive: true,
      svgoPlugins: [
        {
          removeViewBox: false
        }
      ],
      use: [ pngquant() ]
    }))
    .pipe(gulp.dest( buildPaths.img ));
});
