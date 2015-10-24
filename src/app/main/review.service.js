(function () {

    angular.module('app').service('ReviewService', ReviewService);

    /** @ngInject */
    function ReviewService($http) {
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
