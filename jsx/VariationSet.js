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
        this.set.trigger('change');
    };

    VariationData.prototype.reset = function() {
        this.options = [];
        this.property_id = 0;
        this.set.trigger('change');
    };

    VariationData.prototype.getProperty = function() {
        return PropertyMap[this.property_id];
    };


    var VariationSet = function() {
        this.primaryProperty = new VariationData(this);
        this.secondaryProperty = new VariationData(this);
    };


    _.extend(VariationSet.prototype, Backbone.Events);

    return VariationSet;
});
