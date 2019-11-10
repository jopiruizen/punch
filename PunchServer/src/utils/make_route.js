var fs = require("fs");

function findRoute( path ) {
    var content = fs.readFileSync("./punch/core/routes.json");
    var json = JSON.parse(content);
    for( var i = 0 ; i < json.routes.length; i++ ) {
        var route = json.routes[i];
        if( path == route.path) {
            return route;
        }
    }
    
    return {
        path: path,
        error: "route_not_registered.",
        message: "Route is not registered in your collection."
    }
}   

module.exports = findRoute;