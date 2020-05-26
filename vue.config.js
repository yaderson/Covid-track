module.exports = {
    publicPath: process.env.NODE_ENV === 'production'? './': './',
    pwa: {
        name: 'My App',
        themeColor: '#82d8ca',
        backgroundColor: '#b4d9d3',
        msTileColor: '#b4d9d3',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'b4d9d3',

        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: './dev/sw.js',
            // ...other Workbox options...
        }
    }

}