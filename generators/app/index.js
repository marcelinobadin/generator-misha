(function () {
  'use strict';

  var path = require('path');
  var yeoman = require('yeoman-generator');
  var yosay = require('yosay');
  var chalk = require('chalk');
  var cordova = require('cordova-lib').cordova.raw; // get the promise version of all methods
  var fs = require('fs');

  // local modules
  var utils = require('../../utils/utils.js');
  var config = require('../../utils/config.js');
  var bowerConfig = require('./sources/bower-config.js');
  var cordovaConfig = require('./sources/cordova-config.js');
  var sampleAnswers = require('./sources/sample-answers.js');

  module.exports = yeoman.Base.extend({

    initializing: function () {
      // get package.json content
      this.pkg = require('../../package.json');
      // non-empty dir?
      this.fileCount = fs.readdirSync('.').length;
      // read .yo-rc
      this.answers = this.config.getAll().answers;
      // is update?
      this.update = this.answers ? true : false;

      // abort when directory is not empty on first run
      if (!this.update && this.fileCount > 0) {
        this.log(chalk.red('Non-empty directory. Cordova needs an empty directory to set up project'));
        process.exit(1);
      }
    },

    prompting: function () {
      if (this.update) {
        return;
      }
      // say hello
      if (!this.options['skip-welcome-message']) { // for use with generator-m-server
        this.log(yosay(
          'Welcome to the polished Generator-Misha! v.' + this.pkg.version
        ));
      }

      // Set appName when generator was called with `--appName=HelloApp`
      if (this.options['app-name']) {
        this.appName = this.options['app-name'];
      }

      var prompts = [
        // appName
        {
          type: 'input',
          name: 'appName',
          message: 'state a name for your project (this name will be displayed below the app icon)',
          validate: utils.validateAppName,
          when: function () {
            // Show this prompt only if appName is not already set
            return !this.appName;
          }.bind(this)
        },
        // appId
        {
          type: 'input',
          name: 'appId',
          message: 'state a bundle identifier for your project (e.g. com.company.project)',
          validate: utils.validateAppId
        },
        // ionic css
        {
          type: 'list',
          name: 'ionicCss',
          message: 'Choose ionic CSS or SASS',
          choices: [
            {
              name: 'ionic CSS (faster, for starters)',
              value: true
            },
            {
              name: 'ionic SASS (more flexible, for pros)',
              value: false
            }
          ]
        },
        // bower packages
        {
          type: 'checkbox',
          name: 'bowerPackages',
          message: 'Choose all bower packages in addition to angular, ionic, angular-ui-router, cordova and ngCordova:',
          choices: bowerConfig.optional
        },
        // select platforms
        {
          type: 'checkbox',
          name: 'platforms',
          message: 'Select all platforms you want to support:',
          choices: cordovaConfig.platforms
        },
        // select plugins
        {
          type: 'checkbox',
          name: 'plugins',
          message: 'Select all cordova plugins you want to install',
          choices: cordovaConfig.plugins
        }
      ];

      // prompt and save results in this.answers
      if (!this.options['skip-prompts']) {
        // tell yeoman we're doing asynchronous stuff here
        // so it can wait with subsequent tasks
        var done = this.async();

        this.prompt(prompts, function (answers) { // prompt
          this.answers = answers;

          done();
        }.bind(this));
      }
    },

    configuring: function () {

      // debugging
      if (this.options['skip-prompts']) {
        this.answers = sampleAnswers.getStandard({
          'ios-only': this.options['ios-only'],
          'android-only': this.options['android-only'],
          'cordova': this.options.cordova
        });
        this.log(chalk.inverse(JSON.stringify(this.answers, null, '  ')));
      }

      // manipulate answers
      if (this.appName) { // save when name was provided in app-name option
        this.answers.appName = this.appName;
      }
      // save appModule in answers
      this.answers.appModule = utils.moduleName(this.answers.appName);

      // store answers in .yo-rc.json
      this.config.set('answers', this.answers);
    },

    writing: {

      cordova: function () {
        if (this.update) {
          return true;
        }

        // cordova project
        var promise = cordova.create('.', this.answers.appId, this.answers.appName, this.answers.appName)
          // add platforms and save to config.xml
          .then(function () {
            this.log(chalk.green('Created cordova project'));
            if (this.options['skip-sdk'] || !this.answers.platforms.length) {
              return true;
            }
            else {
              return cordova.platform('add', this.answers.platforms, {save: true});
            }
          }.bind(this))
          // add plugins and save to config.xml
          .then(function () {
            this.log(chalk.green('Added platforms: ' + this.answers.platforms.join(', ')));
            if (this.options['skip-sdk'] || !this.answers.plugins.length) {
              return true;
            }
            else {
              return cordova.plugin('add', this.answers.plugins, {save: true});
            }
          }.bind(this))
          // all
          .then(function () {
            this.log(chalk.green('Added plugins: ' + this.answers.plugins.join(', ')));
            this.log(chalk.green('Cordova project was set up successfully! Project Name: '), chalk.bgGreen(this.answers.appName));
          }.bind(this))
          .catch(function (err) {
            this.log(chalk.red('Couldn\'t finish generator: \n' + err));
            process.exit(1);
          }.bind(this));

        // since cordova needs empty folder to work, return promise so yeoman waits before creating files
        return promise;
      },

      app: function () {
        // prepare bower.json
        var bowerJSON = bowerConfig.bowerJSON;
        // include selected packages
        for (var i = 0, bowerPackage; ((bowerPackage = this.answers.bowerPackages[i])); i++) {
          bowerPackage = bowerPackage.split('#');
          bowerJSON.dependencies[bowerPackage[0]] = bowerPackage[1];
        }

        // add other properties
        bowerJSON.name = this.answers.appName;
        bowerJSON.private = true;

        // dependencies
        this.write('bower.json', JSON.stringify(bowerJSON, null, 2));
        this.copy('package.json', 'package.json');

        // app files
        // add random color to navbar
        this.barColor = utils.barColor();
        this.template('_index.html', 'app/index.html');
        this.template('_app.js', 'app/app.js');

        // other files
        this.directory('hooks', 'hooks');
        this.copy('gulpfile.js', 'gulpfile.js');
        this.template('gulp/_injecting.js', 'gulp/injecting.js');
        this.copy('gulp/building.js');
        this.copy('gulp/configuring.js');
        this.copy('gulp/cordova.js');
        this.copy('gulp/linting.js');
        this.copy('gulp/testing.js');
        this.copy('gulp/watching.js');
        this.copy('jenkins.sh', 'jenkins.sh');
        this.copy('karma.conf.js', 'karma.conf.js');
        this.copy('protractor.conf.js', 'protractor.conf.js');
        this.directory('res', 'res');
        this.directory('test', 'test');
        this.directory('blocks', 'app/blocks');

        // dot files
        this.template('_eslintrc_app', 'app/.eslintrc');
        this.copy('bowerrc', '.bowerrc');
        this.copy('editorconfig', '.editorconfig');
        this.copy('eslintrc', '.eslintrc');
        this.copy('eslintignore', '.eslintignore');
        this.copy('gitattributes', '.gitattributes');
        this.copy('gitignore', '.gitignore');
        this.copy('.travis.yml', '.travis.yml');
        // inject project name, version and info into readme
        var readme = this.read(path.join(__dirname, '../../', 'README.md'));
        readme = readme.replace(/^# Generator-Misha/, '# ' + this.answers.appName + '\nThis project was generated with Generator-Misha v' + this.pkg.version + '. For more info visit the [repository](https://github.com/marcelinobadin/generator-misha) or check out the README below.\n\n# Generator-Misha v' + this.pkg.version);
        this.write(this.destinationRoot() + '/README.md', readme);
      },
      subgenerators: function () {
        // create main module
        this.composeWith('misha:module', {
          arguments: config.DEFAULT_MODULE,
          options: {
            mainModule: true,
            ionicCss: this.answers.ionicCss,
            'skip-prompts': this.options['skip-prompts']
          }
        });
      }
    },

    install: function () {
      // insall npm, bower and save plugins/platforms
      this.installDependencies({
        npm: true,
        bower: true,
        skipInstall: this.options['skip-install']
      });
    },

    end: function () {
      this.log(yosay(
        'All done! To get going run:\n' +
        chalk.green('gulp watch \n')
      ));
    }
  });
})();
