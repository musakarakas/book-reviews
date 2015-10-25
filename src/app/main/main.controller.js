(function () {
    'use strict';

    angular.module('app')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController(ReviewService) {
        var vm = this;

        vm.reviews = [];
        vm.filters = [
            {label: 'Everyone', type: 'any'},
            {label: 'Readers', type: 'reader', filterProp: {user: {type: 'reader'}}},
            {label: 'Critics', type: 'critic', filterProp: {user: {type: 'critic'}}},
            {label: 'Editors', type: 'editor', filterProp: {user: {type: 'editor'}}},
            {label: 'Librarians', type: 'librarian', filterProp: {user: {type: 'librarian'}}},
            {label: 'Bloggers', type: 'blogger', filterProp: {user: {type: 'blogger'}}}
        ];
        vm.filterProp = undefined;
        vm.orders = [
            {label: 'Most Helpful', title: 'Most Helpful', prop: ['-helpful_count', '+not_helpful_count']},
            {label: 'Highest Rating', title: 'Highest Rated', prop: '-rating'},
            {label: 'Newest First', title: 'Newest', prop: '-date'}
        ];
        vm.order = vm.orders[0];

        vm.averageRating = averageRating;
        vm.reviewCountByUserType = reviewCountByUserType;
        vm.reviewCountByRating = reviewCountByRating;
        vm.helpful = helpful;
        vm.notHelpful = notHelpful;

        activate();

        function activate() {
            ReviewService.query().then(function (reviews) {
                vm.reviews = reviews;
            });
        }

        function averageRating() {
            if (!vm.reviews.length)
                return 0;

            var total = vm.reviews.reduce(function sum(total, review) {
                return total + review.rating;
            }, 0);

            return Math.round(total / vm.reviews.length);
        }

        function reviewCountByUserType(userType) {
            if (userType === 'any')
                return vm.reviews.length;

            return vm.reviews.filter(function (review) {
                return review.user.type === userType;
            }).length;
        }

        function reviewCountByRating(rating) {
            return vm.reviews.filter(function (review) {
                return review.rating === rating;
            }).length;
        }

        function helpful(review) {
            ReviewService.helpful(review.id).then(function () {
                review.helpful_count++;
            });
        }

        function notHelpful(review) {
            ReviewService.notHelpful(review.id).then(function () {
                review.not_helpful_count++;
            });
        }

    }
})();
