define("modules/perseus/smith",["jquery"],function(a){return{name:'Perseus: References in Smith\'s "Greek and Roman biography and mythology"',type:"person",dataType:"xml",corsEnabled:!0,parseData:function(a){var b=awld.accessor(a),c=b("head persName");return{names:c,name:c.join(", or "),description:b("p")}}}})