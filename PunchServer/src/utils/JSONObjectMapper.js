const  lodash = require('lodash');

function JSONObjectMapper () {} 

JSONObjectMapper.prototype.map = function ( json , source ) {
    if( json instanceof Object ) {
        this.parse_obj ( json , source) ;
    } else if ( json instanceof Array ) {
        this.parse_array ( json, source );
    }
} 

JSONObjectMapper.prototype.parse_obj = function ( json  , source  ) {
    for( var prop in json ) {
        var value = json [prop];
        if( value instanceof Object ) {
            this.parse_obj ( value , source );
        } else if ( value instanceof  Array  ) {
            this.parse_array  ( value , source );
        } else if( value.split("")[0] === "$" ) {
            var prop_path = value.substring(1);
            json[prop] = lodash.get( source, prop_path );
        }
    }
}

JSONObjectMapper.prototype.parse_array = function ( json_array, source ) {
    for( var i = 0; i < json_array.length; i++ ) {
        var item = json_array[i];
        if( item instanceof Object ) {
            this.parse_obj ( item , source );
        } else if ( item instanceof  Array ) {
            this.parse_array ( item , source );
        } else if( value.split("")[0] === "$" ) {
            var prop_path = value.substring(1);
            json[prop] = lodash.get( source, prop_path );
        }
    }
}

module.exports = JSONObjectMapper;