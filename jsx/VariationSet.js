define([
    'underscore',
    'PropertyMap',
    'Backbone'
], function(
    _,
    PropertyMap,
    Backbone
) {

    var VariationData = function(set) {
        this.set = set;
        this.options = [];
        this.property_id = 0;
    };

    _.extend(VariationData.prototype, Backbone.Events);

    VariationData.prototype.setProperty = function(propertyId) {
        this.property_id = propertyId;
    };

    VariationData.prototype.getProperty = function() {
        return PropertyMap[this.property_id];
    };

    var VariationSet = function() {
        this.byProperty = {};
        this.properties = [];
    };

    VariationSet.prototype.cancelProperty = function(propertyId) {
        if (!_.contains(this.properties, propertyId)) {
            console.log(this.properties, 'dones not contain', propertyId);
            return false;
        }
        this.properties = _.without(this.properties, propertyId);
        delete this.byProperty[propertyId];
        this.trigger('change');
        return true;
    };

    VariationSet.prototype.setProperty = function(propertyId) {
        if (this.properties.length == 2) {
            return false;
        }
        this.properties.push(propertyId);
        var iation;
        this.byProperty[propertyId] = iation = new VariationData();
        this.trigger('change');
        iation.setProperty(propertyId);
    };

    VariationSet.prototype.addOption = function(property_id, value) {
        this.byProperty[property_id].options.push({
            value: value,
            price: 0,
            inStock: true
        });
    };

    VariationSet.prototype.getOptions = function(property_id) {
        var variation = this.byProperty[property_id];
        return variation.options;
    };


    _.extend(VariationSet.prototype, Backbone.Events);

    return VariationSet;
});
