const gulp = require('gulp');
const webpackCompiler = require('./webpack.js');
const fs = require('fs');
const deleteFolderRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index) {
      var curPath = path + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};
function onBuild(done) {
  return function(err, stats) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(stats.toString());
    }
    if (done) {
      done();
    }
  };
}

gulp.task('build', function(done) {
  deleteFolderRecursive('./assets');
  webpackCompiler.run(onBuild(done));
});

gulp.task('dev', ['run'], function(done) {
  webpackCompiler.watch(
    {
      // ignored: /node_modules/
    },
    function(err, stats) {
      console.log('Front-end compiled');
    }
  );
  process.on('SIGINT', function() {
    process.exit();
  });
});
gulp.task('run', function() {
  require('./index.js');
});
