const fs = require('fs');
const JSONObjectMapper = require('../utils/JSONObjectMapper.js');
function PunchController ( request, response, db, route ) {

    var collections = {};
    var punch = { 
        request: request,
        models: {}
    };

    function initCollections() {
        for( var i = 0; i < route.collections.length ; i++ ) {
            var name = route.collections[i];
            collections[name] = db.collection(name);
            collections[name].collectionName = name; 
        }
    }

    function mapRequestData () {
        var jsonMapper = new JSONObjectMapper();
        var content =  fs.readFileSync("./punch/core/mapping/model/" + route.model_mapping ).toString();
        var json = JSON.parse (content);
        jsonMapper.map(json, request.body );
        punch.models[route.map_model_name] = json ;
    }

    function runDynamicCode() {
        console.log("");
        console.log("DynamicSnippetController.runDynamicCode() executing dynamic code....");
        var code = fs.readFileSync("./punch/core/scripts/" + route.script ).toString();
        eval(code);
        if( main !== undefined ) {
            main();
        }
        console.log("DynamicSnippetController.runDynamicCode() dynamic code execution success!");
    }
    
    /* 
     * Punch Releted Functions 
     *  
     */

    punch.render = function (data) { 
        var jsonMapper = new JSONObjectMapper();
        var content =  fs.readFileSync("./punch/core/mapping/response/" + route.response_mapping  );
        var json = JSON.parse(content);
        jsonMapper.map( json, data);
        response.json(json);
    }
    
    punch.insertOne = function ( collection , data ) {
        var date = new Date();
        data.date_created = date.toString();
        data.date_modified = data.date_created;
        data._id = punch.makeID();
        return new Promise( (resolve, reject) => {
            function dbCallback ( err , dbResult ) {
                if( dbResult.result !== undefined ) {
                    resolve ( {err: err, result: dbResult.result } );
                } else if( err !== null ) {
                    resolve ( {err: err, result: dbResult.result }  );
                }
            }
            collection.insertOne ( data , dbCallback);
        });
    };

    punch.delete = function ( collection , data ) {

    }

    punch.update = function ( collection, data ) {

    }

    punch.list = function ( collection , data ) {

    }

    punch.makeID = function () {
        var date = new Date();
        var _id =  "" + date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getUTCDay();
        _id +=  date.getUTCHours() + "_" + date.getUTCMinutes() + "_" + date.getUTCSeconds() + "_" + date.getUTCMilliseconds();
        return _id;
    }


    initCollections();
    mapRequestData();
    runDynamicCode();
   
}

module.exports = PunchController;