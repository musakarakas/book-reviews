(function () {
    'use strict';

    angular.module('app').controller('MainController', MainController);

    /** @ngInject */
    function MainController(MainService) {
        var vm = this;

        vm.avgStarCount = 4;
        vm.reviews = [];
        vm.orders = [
            {label: 'Most Helpful', prop: ['-helpful_count', '+not_helpful_count']},
            {label: 'Highest Rating', prop: '-rating'},
            {label: 'Newest First', prop: '-date'}
        ];
        vm.order = vm.orders[0];
        vm.reviewCountBy = reviewCountBy;

        activate();

        function activate() {
            MainService.query().then(function (reviews) {
                vm.reviews = reviews;
            });
        }

        function reviewCountBy(userType) {
            return vm.reviews.filter(function (review) {
                return review.user.type === userType;
            }).length;
        }

    }
})();
