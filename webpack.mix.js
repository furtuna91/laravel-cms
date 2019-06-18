const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/app.js')
   .sass('resources/assets/sass/app.scss', 'public/app.css');

mix.styles([
   'resources/assets/admin/plugins/icon-kit/dist/css/iconkit.min.css',
   'resources/assets/admin/plugins/ionicons/dist/css/ionicons.min.css',
   'resources/assets/admin/plugins/perfect-scrollbar/css/perfect-scrollbar.css',
   'resources/assets/admin/plugins/datatables.net-bs4/css/dataTables.bootstrap4.min.css',
   'resources/assets/admin/plugins/jvectormap/jquery-jvectormap.css',
   'resources/assets/admin/plugins/tempusdominus-bootstrap-4/build/css/tempusdominus-bootstrap-4.min.css',
   'resources/assets/admin/plugins/weather-icons/css/weather-icons.min.css',
   'resources/assets/admin/plugins/c3/c3.min.css',
   'resources/assets/admin/plugins/owl.carousel/dist/assets/owl.carousel.min.css',
   'resources/assets/admin/plugins/owl.carousel/dist/assets/owl.theme.default.min.css',
   'resources/assets/admin/css/theme.min.css',
], 'public/css/admin.css');

mix.scripts([
   'resources/assets/admin/plugins/perfect-scrollbar/dist/perfect-scrollbar.min.js',
   'resources/assets/admin/plugins/screenfull/dist/screenfull.js',
   'resources/assets/admin/plugins/datatables.net/js/jquery.dataTables.min.js',
   'resources/assets/admin/plugins/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
   'resources/assets/admin/plugins/datatables.net-responsive/js/dataTables.responsive.min.js',
   'resources/assets/admin/plugins/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js',
   'resources/assets/admin/plugins/jvectormap/jquery-jvectormap.min.js',
   'resources/assets/admin/plugins/jvectormap/tests/assets/jquery-jvectormap-world-mill-en.js',
   'resources/assets/admin/plugins/moment/moment.js',
   'resources/assets/admin/plugins/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js',
   'resources/assets/admin/plugins/d3/dist/d3.min.js',
   'resources/assets/admin/plugins/c3/c3.min.js',
   'resources/assets/admin/plugins/moment/moment.js',
   'resources/assets/admin/js/tables.js',
   'resources/assets/admin/js/widgets.js',
   'resources/assets/admin/js/charts.js',
   'resources/assets/admin/js/theme.min.js',
   'resources/assets/admin/js/modernizr-2.8.3.min.js',
], 'public/js/admin.js');