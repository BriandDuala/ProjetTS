const mocha = require('junit-mocha');
gulp.task('./test-results.xml', function () {
    gulp.src('tests/**/*.js')
        .pipe(mocha({
          reporter: 'mocha-junit-reporter',
          reporterOptions:{
            mochaFile: './TEST-.xml'
          } 
        }))    
});
