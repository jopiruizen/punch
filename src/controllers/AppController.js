var fs = require('fs');
const PunchController = require("./PunchController.js");

function AppController(app, db) {

    function findRouteInCore(path) {
        var content = fs.readFileSync("./punch/core/routes.json");
        var json = JSON.parse(content);
        for (var i = 0; i < json.routes.length; i++) {
            var route = json.routes[i];
            if (path == route.path) {
                return route;
            }
        }
        return null;
    }

    async function findRouteInDB(path) {
        var data = await db.collection("routes").findOne({ path: path });
        if (data !== null) {
            return data;
        }
        return {
            path: path,
            error: "route_not_registered.",
        }
    }

    async function findRoute(path) {
        var route = findRouteInCore(path);
        if (route !== null) {
            return route;
        }
        return await findRouteInDB(path);
    }

    app.post('*', async (req, res) => {
        let route = await findRoute(req.originalUrl);
        if (route === null || route.error !== undefined ) {
            res.json({
                greetings: "Welcome to Punch!",
                system_message: {
                    status_code: "route_not_registered",
                    message: "The path you're trying to access is not registered in core route file or your routes collection.",
                    path: req.originalUrl,
                }
            });
        } else {
            new PunchController(req, res, db, route);
        }
    });


}
module.exports = AppController;