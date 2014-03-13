cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.blackberry.app/www/client.js",
        "id": "com.blackberry.app.client",
        "clobbers": [
            "blackberry.app"
        ]
    },
    {
        "file": "plugins/com.blackberry.ui.toast/www/client.js",
        "id": "com.blackberry.ui.toast.client",
        "clobbers": [
            "blackberry.ui.toast"
        ]
    },
    {
        "file": "plugins/com.blackberry.invoke/www/client.js",
        "id": "com.blackberry.invoke.client",
        "clobbers": [
            "blackberry.invoke"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.blackberry.app": "1.0.0",
    "com.blackberry.ui.toast": "1.0.0",
    "com.blackberry.invoke": "1.0.0"
}
// BOTTOM OF METADATA
});