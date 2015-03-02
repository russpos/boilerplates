define([
    'Backbone'
], function(
    Backbone
) {

    var Option = Backbone.Model.extend({
        idAttribute: 'value',
        defaults: {
            value: '',
            is_in_stock: true,
            price: 0
        }
    });

    var Options = Backbone.Collection.extend({
        model: Option
    });

    var VariationProperty = Backbone.Model.extend({
        idAttribte: 'property_id',
        defaults: {
            property_id: 0,
            is_pricing_enabled: false
        },

        initialize: function() {
            this.options = new Options();
        },

        toJSON: function() {
            var data = Backbone.Model.prototype.toJSON.apply(this);
            data.options = this.options.toJSON();
            return data;
        }
    });

    var VariationStore = Backbone.Collection.extend({
        model: VariationProperty
    });

    return VariationStore;

});
