var hasSameProperties =  function hasSameProperties(obj1, obj2) {
    return Object.keys(obj1).every(function (property) {
        return obj2.hasOwnProperty(property);
    });
};

module.exports.hasSameProperties = hasSameProperties;