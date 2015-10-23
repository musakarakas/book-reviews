(function () {

    angular.module('app').service('MainService', MainService);

    /** @ngInject */
    function MainService($http) {
        return {
            query: query
        };

        function query() {
            return $http.get('reviews.json').then(function (response) {
                return response.data.data;
            });
        }
    }

})();
