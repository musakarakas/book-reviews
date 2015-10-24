(function () {

    angular.module('app')
        .service('ReviewService', ReviewService);

    /** @ngInject */
    function ReviewService(API_URL, $http) {

        this.query = query;
        this.helpful = helpful;
        this.notHelpful = notHelpful;

        function query() {
            return $http.get(API_URL + 'reviews').then(function (response) {
                return response.data.data;
            });
        }

        function helpful(reviewId) {
            return vote(reviewId, true);
        }

        function notHelpful(reviewId) {
            return vote(reviewId, false);
        }

        function vote(reviewId, helpful) {
            return $http.post(API_URL + 'reviews/' + reviewId + '/vote', {
                type: helpful ? 'helpful' : 'not_helpful'
            }).then(function (response) {
                return response.data;
            });
        }
    }

})();
