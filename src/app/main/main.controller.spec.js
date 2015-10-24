(function () {
    'use strict';

    describe('MainCtrl', function () {
        var vm;
        var $httpBackend;
        var API_URL;

        beforeEach(module('app'));
        beforeEach(inject(function (_$controller_, _$httpBackend_, _API_URL_) {
            vm = _$controller_('MainController');
            $httpBackend = _$httpBackend_;
            API_URL = _API_URL_;
        }));

        it('should define filters to filter reviews by user type', function () {
            expect(angular.isArray(vm.filters)).toBeTruthy();
            expect(vm.filters.length).toBe(6);
        });

        it('should make an api call to fetch the reviews', function () {
            $httpBackend.expectGET(API_URL + 'reviews').respond({data: [{}]});

            expect(vm.reviews.length).toBe(0);
            $httpBackend.flush();
            expect(vm.reviews.length).toBe(1);
        });

        describe('MainCtrl.helpful(review)', function () {

            beforeEach(inject(function () {
                $httpBackend.expectGET(API_URL + 'reviews').respond({});
            }));

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

        describe('MainCtrl.notHelpful(review)', function () {

            beforeEach(inject(function () {
                $httpBackend.expectGET(API_URL + 'reviews').respond({});
            }));

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
})();
