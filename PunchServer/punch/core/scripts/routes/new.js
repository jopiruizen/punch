/*
 * Dynamic Script for creating route.
 */
async function main() {
    console.log("");
    console.log("make ID " + _makeID()) ;

    var route = await collections.routes.findOne({ path: punch.models.route.path });
    if (route === null) {
        __insert();
    } else {
        punch.render({ route: punch.models.route, system_message: { status_code: "creation failed", message: "record already exist." } });
    }
}

function _makeID  () {
    var date = new Date();
    var _id =  "" + date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getDay();
    _id +=  date.getHours() + "_" + date.getMinutes() + "_" + date.getSeconds() + "_" + date.getMilliseconds();
    return _id;
}

async function __insert() {
    var data = await punch.insertOne(collections.routes, punch.models.route);
    if (data.result !== undefined) {
        punch.render({
            system_message: { status_code: "success", message: "System Messages created." },
            content: {
                route: punch.models.route,
                db_result: data.result,
            }
        });
    } else if (data.err) {
        punch.render({
            system_message: { status_code: "Technical Error", message: "Oops something bad happened" },
            route: punch.models.route
        });
    }
}