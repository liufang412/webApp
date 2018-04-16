var gulp=require('gulp');
var $=require('gulp-load-plugins')();
var connect=require('gulp-connect');
var open=require('open');
// 定义目录文件
var app={
	srcPath:'src/',
	devPath:'build/',
	prdPath:'dist/',
}
gulp.task('angular',function(){
	gulp.src('./node_modules/angular/*.js')
		.pipe(gulp.dest(app.devPath+'vendor/angular'))
		.pipe(gulp.dest(app.prdPath+'vendor/angular'))
		.pipe($.connect.reload())
})
gulp.task('ui.router',function(){
	gulp.src('./node_modules/angular-ui-router/release/*.js')
		.pipe(gulp.dest(app.devPath+'vendor/angular-ui-router/release'))
		.pipe(gulp.dest(app.prdPath+'vendor/angular-ui-router/release'))
		.pipe($.connect.reload())
})
gulp.task('validation',function(){
	gulp.src('./node_modules/angular-validation/dist/*.js')
		.pipe(gulp.dest(app.devPath+'vendor/angular-validation/dist'))
		.pipe(gulp.dest(app.prdPath+'vendor/angular-validation/dist'))
		.pipe($.connect.reload())
})
gulp.task('cookies',function(){
	gulp.src('./node_modules/angular-cookies/*.js')
		.pipe(gulp.dest(app.devPath+'vendor/angular-cookies'))
		.pipe(gulp.dest(app.prdPath+'vendor/angular-cookies'))
		.pipe($.connect.reload())
})
gulp.task('html',function(){
	gulp.src(app.srcPath+'**/*.html')
		.pipe(gulp.dest(app.devPath))
		.pipe(gulp.dest(app.prdPath))
		.pipe($.connect.reload())
})
gulp.task('json',function(){
	gulp.src(app.srcPath+'data/**/*.json')
		.pipe(gulp.dest(app.devPath+'data'))
		.pipe(gulp.dest(app.prdPath+'data'))
		.pipe($.connect.reload())
})
gulp.task('less',function(){
	gulp.src(app.srcPath+'style/index.less')
		.pipe($.less())
		.pipe(gulp.dest(app.devPath+'css'))
		.pipe($.cssmin())
		.pipe(gulp.dest(app.prdPath+'css'))
		.pipe($.connect.reload())

})
gulp.task('js',function(){
	gulp.src(app.srcPath+'script/**/*.js')
		.pipe($.concat('index.js'))
		.pipe(gulp.dest(app.devPath+'js'))
		.pipe($.uglify())
		.pipe(gulp.dest(app.prdPath+'js'))
		.pipe($.connect.reload())

})
gulp.task('image',function(){
	gulp.src(app.srcPath+'image/**/*')
		.pipe(gulp.dest(app.devPath+'image'))
		.pipe($.imagemin())
		.pipe(gulp.dest(app.prdPath+'image'))
		.pipe($.connect.reload())

})
gulp.task('clean',function(){
	gulp.src([app.devPath,app.prdPath])
		.pipe($.clean())

})
gulp.task('build',['image','js','json','html','less','angular','ui.router','cookies','validation']);

gulp.task('serve',['build'],function(){
	$.connect.server({
		root:app.devPath,
		livereload:true,
		port:1234,
	});
	open('http://localhost:1234')
	gulp.watch(app.srcPath+'**/*.html',['html']);
	gulp.watch(app.srcPath+'script/**/*.js',['js']);
	gulp.watch(app.srcPath+'data/**/*.json',['json']);
	gulp.watch(app.srcPath+'style/**/*.less',['less']);
	gulp.watch(app.srcPath+'image/**/*',['image']);

});

gulp.task('default',['serve']);