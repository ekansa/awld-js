// Module: OpenContext HTML

define(['jquery'], function($) {
    return {
        name: 'Open Context Resource',
        dataType: 'json',
        type: 'object',
        toDataUri: function(uri) {
            return uri;
        },
        parseData: function(data) {
            var getText = awld.accessor(xml);
            data.name = data['dc-terms:title'];
            data.description = ''; // tbd get item category
            var imageURI = null;
            if('oc-gen:has-obs' in data){
                // get an imageURI from the item observations
                imageURI = eachRecursiveKeyFind(data['oc-gen:has-obs'], 'oc-gen:thumbnail-uri');
            }
            if(imageURI == null && 'oc-gen:has-files' in data){
                // get an image URI from the item files (if a media item)
                // first one is a thumbnail
                imageURI = eachRecursiveKeyFind(data['oc-gen:has-files'], 'id');
            }
            data.imageURI = imageURI;
            return data;
        },
    };
});

function eachRecursiveKeyFind(obj, search_key){
    // recursively goes through an object to find a key, returns its value if found
    var output = null;
    for (var key in obj){
        if (key != search_key){
            // the current key is not the search_key
            if (output == null){
                if (typeof obj[key] == "object" && obj[key] !== null){
                    output = eachRecursive(obj[key]);
                }
            }
        }
        else{
            output = obj[key];
        }
    } 
    return output;
}
