define([
    'Backbone',
    'underscore',
    'VariationStore'
], function(
    Backbone,
    _,
    VariationStore
) {

    var store = new VariationStore();

    // Return a set of methods that allow you manipulate the internal store
    var VariationController = {

        areBothVariationsSet: function() {
            console.log('areBothVariationsSet');
            return (store.length == 2);
        },

        getPropertyIdAtIndex: function(index) {
            console.log('getPropertyIdAtIndex', index);
            return store.models[index].get('property_id');
        },

        areNeitherVariationsSet: function() {
            console.log('areNeitherVariationsSet');
            return (store.length == 0);
        },

        getVariationByPropertyId: function(property_id) {
            console.log('getVariationByPropertyId', property_id);
            return store.findWhere({ property_id: property_id });
        },

        getOptionsByPropertyId: function(property_id) {
            console.log('getOptionsByPropertyId', property_id);
            var variation = this.getVariationByPropertyId(property_id);
            if (!variation) {
                // TODO: Make immutable
                return [];
            }

            return variation.options.toJSON();
        },

        addVariationForPropertyId: function(property_id) {
            console.log('addVariationForPropertyId', property_id);
            // Already at max
            if (this.areBothVariationsSet()) {
                return false;
            }

            // Already exists with this property
            if (store.get(property_id)) {
                return false;
            }
            console.log(' -> Added');
            store.add({ property_id: property_id });
            this.trigger('change');
        },

        cancelVariationWithPropertyId: function(property_id) {
            console.log('cancelVariationWithPropertyId', property_id);
            var variation = this.getVariationByPropertyId(property_id);
            if (variation) {
                store.remove(variation);
                this.trigger('change');
            }
        },

        addOptionForPropertyId: function(property_id, value) {
            console.log('addOptionForPropertyId', property_id, value);
            var variation = this.getVariationByPropertyId(property_id);
            if (variation) {
                variation.options.add({ value: value });
                this.trigger('change');
            }
        },

        removeOptionFromPropertyId: function(property_id, value) {
            console.log('removeOptionFromPropertyId', property_id, value);
            var variation = this.getVariationByPropertyId(property_id);
            if (variation) {
                console.l
                var option = variation.options.findWhere({ value: value });
                variation.options.remove(option);
                this.trigger('change');
            }
        },

        enablePricingForVariation: function(property_id) {
            var property = this.getVariationByPropertyId(property_id);
            if (property) {
                property.set('is_pricing_enabled', true);
                this.trigger('change');
            }
        },

        disablePricingForVariation: function(property_id) {
            var property = this.getVariationByPropertyId(property_id);
            if (property) {
                property.set('is_pricing_enabled', false);
                this.trigger('change');
            }
        },

        toJSON: function() {
            return store.toJSON();
        }
    };

    _.extend(VariationController, Backbone.Events);

    // TODO: Remove this
    window.VariationController = VariationController;
    return VariationController;

});
