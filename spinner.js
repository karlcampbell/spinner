/**
 * Created by karl on 12/20/2013.
 */
'use strict';

//directive

angular.module('spinner', [])
  .directive('spinner', function ($window, Spinner) {
    return {
      scope: true,
      link: function (scope, element, attr) {

        var window = angular.element($window);
        scope.spinner = null;

        function stopSpinner() {
          if (scope.spinner) {
            scope.spinner.stop();
            scope.spinner = null;
            element.hide();
          }
        }

        function startSpinner() {
          element.show();
          scope.spinner = new $window.Spinner(angular.fromJson(attr.usSpinner.replace(/'/g,'\"')));
          scope.spinner.spin(element[0]);
        }

        scope.$watch(Spinner.spinning, function(start) {
          //console.log(attr.usSpinner);
          if(start) {
            startSpinner()
          } else {
            stopSpinner();
          }
        })

        scope.$on('$destroy', function () {
          stopSpinner();
        });

        scope.style = function () {
          var top = window.height() / 2 - 35;
          var left = window.width() / 2 - 35;
          return {
            'top':  top + 'px',
            'left': left + 'px'
          };
        }
      }
    };
  });

//factory

angular.module('spinner')
  .factory('spinner', function () {

    var spin = false;

    // Public API here
    return {
      start: function () {
        spin = true;
      },
      stop: function() {
        spin = false;
      },
      spinning: function() {
        return spin;
      }
    };
  });



