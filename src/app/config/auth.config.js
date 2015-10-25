(function () {

    angular.module('app')
        .config(httpConfig);

    /** @ngInject */
    function httpConfig($httpProvider) {
        $httpProvider.interceptors.push(AuthTokenInterceptor);

        /** @ngInject */
        function AuthTokenInterceptor() {
            return {
                request: request
            };

            function request(config) {
                config.headers['X-client_id'] = '110aff0820835c55266969626419d51d5d9e6892cb827acb75fc71ed9ca72344';
                return config;
            }
        }
    }

})();
