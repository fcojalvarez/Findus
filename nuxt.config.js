export default {
    mode: 'spa',
    /*
     ** Headers of the page
     */
    head: {
        title: 'Findus - Find your smartphone',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.13.0/css/all.css' }
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#FFEC6B' },
    /*
     ** Global CSS
     */
    css: [
        'element-ui/lib/theme-chalk/index.css',
        'element-ui/lib/theme-chalk/icon.css',
        'element-ui/lib/theme-chalk/notification.css'
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '@/plugins/element-ui'
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        'cookie-universal-nuxt', [
            '@nuxtjs/firebase',
            {
                config: {
                    apiKey: "AIzaSyCukEmUJxhEr-POEaNfvTVmSWNFYApBdPY",
                    authDomain: "findus-612bc.firebaseapp.com",
                    databaseURL: "https://findus-612bc.firebaseio.com",
                    projectId: "findus-612bc",
                    storageBucket: "findus-612bc.appspot.com",
                    messagingSenderId: "991806799248",
                    appId: "1:991806799248:web:2a684fe758e057c3ee4715"
                },
                services: {
                    auth: true
                }
            }
        ]
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        baseURL: 'https://findusapi.herokuapp.com/'
    },

    /*
     ** Build configuration
     */
    build: {
        transpile: [/^element-ui/],
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    }
}