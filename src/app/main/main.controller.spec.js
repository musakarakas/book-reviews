(function () {
    'use strict';

    describe('MainController', function () {
        var vm;
        var $httpBackend;
        var API_URL;

        beforeEach(module('app'));
        beforeEach(inject(function ($injector, $controller) {
            vm = $controller('MainController');
            $httpBackend = $injector.get('$httpBackend');
            API_URL = $injector.get('API_URL');
        }));

        it('should define filters to filter reviews by user type', function () {
            expect(angular.isArray(vm.filters)).toBeTruthy();
            expect(vm.filters.length).toBe(6);
        });

        it('should make an api call to fetch the reviews', function () {
            expect(vm.reviews.length).toBe(0);

            $httpBackend.expectGET(API_URL + 'reviews').respond({data: [{}]});
            $httpBackend.flush();

            expect(vm.reviews.length).toBe(1);
        });

        describe('.averageRating()', function () {

            it('should return 0 if there are no reviews', function () {
                vm.reviews = [];
                expect(vm.averageRating()).toBe(0);
            });

            it('should calculate the average of all review ratings', function () {
                vm.reviews = [{rating: 1}, {rating: 25}, {rating: 100}];
                expect(vm.averageRating()).toBe(42);
            });

        });

        describe('.reviewCountByUserType(userType)', function () {

            it('should return the number of reviews by given user type', function () {
                vm.reviews = [
                    {user: {type: 'reader'}},
                    {user: {type: 'blogger'}},
                    {user: {type: 'reader'}}
                ];
                expect(vm.reviewCountByUserType('librarian')).toBe(0);
                expect(vm.reviewCountByUserType('blogger')).toBe(1);
                expect(vm.reviewCountByUserType('reader')).toBe(2);
                expect(vm.reviewCountByUserType('any')).toBe(3);
            });
        });

        describe('.reviewCountByRating(rating)', function () {

            it('should return the number of reviews with given rating', function () {
                vm.reviews = [
                    {rating: 1}, {rating: 2}, {rating: 3},
                    {rating: 2}, {rating: 3}, {rating: 4},
                    {rating: 3}, {rating: 4}, {rating: 5}
                ];
                expect(vm.reviewCountByRating(0)).toBe(0);
                expect(vm.reviewCountByRating(1)).toBe(1);
                expect(vm.reviewCountByRating(2)).toBe(2);
                expect(vm.reviewCountByRating(3)).toBe(3);
                expect(vm.reviewCountByRating(4)).toBe(2);
                expect(vm.reviewCountByRating(5)).toBe(1);
            });
        });

        describe('After reviews are fetched', function () {
            beforeEach(inject(function () {
                $httpBackend.expectGET(API_URL + 'reviews').respond({});
                $httpBackend.flush();
            }));

            describe('.helpful(review)', function () {

                it('should increment `helpful_count` property of passed `review` object', function () {
                    var review = {id: 42, helpful_count: 0};
                    vm.helpful(review);

                    $httpBackend.expectPOST(
                        API_URL + 'reviews/' + review.id + '/vote',
                        {type: 'helpful'}
                    ).respond();
                    $httpBackend.flush();

                    expect(review.helpful_count).toBe(1);
                });
            });

            describe('.notHelpful(review)', function () {

                it('should increment `not_helpful_count` property of passed `review` object', function () {
                    var review = {id: 42, not_helpful_count: 0};
                    vm.notHelpful(review);

                    $httpBackend.expectPOST(
                        API_URL + 'reviews/' + review.id + '/vote',
                        {type: 'not_helpful'}
                    ).respond();
                    $httpBackend.flush();

                    expect(review.not_helpful_count).toBe(1);
                });
            });

        });

    });
})();
