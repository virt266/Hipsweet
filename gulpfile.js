'use strict'
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var compass = require('gulp-compass');
var del = require('del');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var wiredep = require('gulp-wiredep');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync').create();

// Задача с названием 'default' запускается автоматически по команде 'gulp' в консоле.
// Эта конструкция работает синхронно, сначала выполняется задача 'clean' и только после ее завершнения запускается 'dev'.
gulp.task('default', ['clean'], function() {
	gulp.run('dev');
});
// Аналогично с предыдушей задачей.
// Выполняет задача 'clean' и после ее завершения запускается 'build'.
gulp.task('production', ['clean'], function() {
	gulp.run('build');
});
// Задача 'dev' представляется собой сборку в режиме разработки.
// Запускает build - сборку, watcher - слежку за файлами и browser-sync.
gulp.task('dev', ['build', 'watch', 'browser-sync']);
// Задача 'build' представляет собой сборку в режиме продакшен.
// Собирает проект.
gulp.task('build', ['html', 'styles', 'scripts', 'assets']);
// Задача 'watch' следит за всеми нашими файлами в проекте и при изменении тех или иных перезапустает соответсвующую задачу.
gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.scss', ['styles']); //стили
    gulp.watch('app/js/**/*.js', ['scripts']); //скрипты
    gulp.watch(['./bower.json', 'app/index.html'], ['html']); // html
    gulp.watch('./app/assets/**/*.*', ['assets']); //наши локальные файлы(картинки, шрифты)
    gulp.watch('app/**/*.*').on('change', browserSync.reload); //Перезапуск browserSynс
});
// Задача 'styles' выполняет сборку наших стилей.
gulp.task('styles', function() {
	return gulp.src('app/sass/{main,about}.scss')
		.pipe(plumber({ // plumber - плагин для отловли ошибок.
			errorHandler: notify.onError(function(err) { // nofity - представление ошибок в удобном для вас виде.
				return {
					title: 'Styles',
					message: err.message
				}
			})
		}))
		.pipe(sourcemaps.init()) //История изменения стилей, которая помогает нам при отладке в devTools.
		.pipe(sass()) //Компиляция sass.
		.pipe(autoprefixer({ //Добавление autoprefixer.
			browsers: ['last 2 versions']
		}))
		//.pipe(concat('styles.css')) //Соедение всех файлом стилей в один и задание ему названия 'styles.css'.
		.pipe(cssnano()) //Минификация стилей
		.pipe(sourcemaps.write())
		.pipe(rename('styles.css')) //Переименование
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/css'));
});
//Задача для удаление папки dist.
gulp.task('clean', function() {
	return del('dist');
})

gulp.task('html', function() {
	gulp.src('app/index.html')
		.pipe(wiredep({ //Добавление ссылок на плагины bower.
			directory: 'app/bower/'
		}))
		.pipe(gulp.dest('app/'))
		.on('end', function() { //запуск задачу 'useref' по завершению задачи 'html'.
			gulp.run('useref');
		});
});

gulp.task('useref', function() {
	return gulp.src('app/index.html')
		.pipe(useref()) //Выполняет объединение файлов в один по указанным в разметке html комментариев.
		.pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssnano()))
		.pipe(gulp.dest('dist/'));
});

gulp.task('scripts', function() {
	gulp.src('app/js/*.js')
		.pipe(uglify()) //Минификация скриптов.
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/js'));
});
//Задача для запуска сервера.
gulp.task('browser-sync', function() {
	return browserSync.init({
		server: {
			baseDir: './dist/'
		}
	});
});
//Перемешение наших локальных файлов в папку build
gulp.task('assets', function() {
	return gulp.src('./app/assets/**/*.*')
		.pipe(gulp.dest('./dist/assets'));
});