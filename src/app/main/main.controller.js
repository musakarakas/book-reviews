(function () {
    'use strict';

    angular.module('app').controller('MainController', MainController);

    /** @ngInject */
    function MainController(MainService) {
        var vm = this;

        vm.averageRating = averageRating;
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
        vm.reviewCountByUserType = reviewCountByUserType;
        vm.reviewCountByRating = reviewCountByRating;

        activate();

        function activate() {
            MainService.query().then(function (reviews) {
                vm.reviews = reviews;
            });
        }

        function averageRating() {
            var total = vm.reviews.reduce(function sum(total, review) {
                return total + review.rating;
            }, 0);

            var average = total / vm.reviews.length;

            return Math.round(average);
        }

        function reviewCountByRating(rating) {
            return vm.reviews.filter(function (review) {
                return review.rating === rating;
            }).length;
        }

        function reviewCountByUserType(userType) {
            if (userType === 'any')
                return vm.reviews.length;

            return vm.reviews.filter(function (review) {
                return review.user.type === userType;
            }).length;
        }

    }
})();
