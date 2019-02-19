const {
  src,
  dest,
  watch,
  series,
  parallel
} = require('gulp')
const concat = require('gulp-concat')
// css
const sass = require('gulp-sass')
const plumber = require('gulp-plumber')
// js
const uglify = require('gulp-uglify')
const optimizejs = require('gulp-optimize-js')
// template
const nunjucks = require('gulp-nunjucks-render')
// server
const browserSync = require('browser-sync').create()

const cssDir = 'dist/css'
const jsDir = 'dist/js'
const pluginDir = 'dist/vendor'
const plugins = {
  script: [
    'node_modules/jquery/dist/jquery.min.js'
  ],
  ui: [
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/font-awesome/css/font-awesome.min.css',
    'node_modules/font-awesome/fonts/fontawesome-webfont.eot',
    'node_modules/font-awesome/fonts/fontawesome-webfont.woff',
    'node_modules/font-awesome/fonts/fontawesome-webfont.woff2'
  ]
}

async function setupPlugin () {
  Object.keys(plugins).forEach(file => {
    plugins[file].forEach(row => {
      let files = row.split('/') 
      let name = files[1]
      let ext = row.split('.').pop()

      if (ext === 'eot' || ext == 'woff' || ext == 'woff2') ext = files[files.length - 2]

      let dir = `${pluginDir}/${name}/${ext}`
      src(row)
      .pipe(dest(dir))
    })
  })
}

function css () {
  return src('src/scss/main.scss')
  .pipe(plumber())
  .pipe(
    sass({
      outputStyle: 'compressed'
    })
    .on('error', sass.logError)
  )
  .pipe(concat('app.min.css'))
  .pipe(dest(cssDir))
}

function js () {
  return src('src/js/*.js')
  .pipe(optimizejs())
  .pipe(concat('app.min.js'))
  .pipe(uglify())
	.pipe(dest(jsDir))
}

function template () {
  return src('src/templates/**/*.html')
  .pipe(nunjucks({
    path: 'src/templates',
    data: {
      name: 'Sindre',
      images: [{
        src: 'image-one.png',
        alt: 'Image one alt text'
      }, {
        src: 'image-two.png',
        alt: 'Image two alt text'
      }]
    }
  }))
  .pipe(dest('dist'))
}

function serve (done) {
  browserSync.init({
		server: { baseDir: 'dist' }
  })
  return done()
}

function reloadBs (done) {
  browserSync.reload()
  return done()
}

function watchSource () {
  watch('src', series(exports.default, reloadBs))
}

exports.css = css
exports.js = js
exports.plugin = setupPlugin
exports.template = template
exports.serve = serve

exports.default = parallel(
  css,
  setupPlugin,
  js,
  template
)

exports.watch = series(
	exports.default,
  serve,
  watchSource
)