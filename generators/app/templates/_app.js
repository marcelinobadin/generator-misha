(function () {
  'use strict';

  angular
    .module('<%= answers.appModule %>', [
      'blocks.exception'
      , 'blocks.logger'
      , 'blocks.router'
      //#new-modules -- Do not remove or edit this line, it is used by the generator
    ]);
})();
