define([
    'VariationSelect',
    'EnabledVariation',
    'VariationController',
    'React',
    'PropertyMap'
], function(
    VariationSelect,
    EnabledVariation,
    VariationController,
    React,
    PropertyMap
) {

    return React.createClass({

        getInitialState: function() {
            return {};
        },

        componentDidMount: function() {
            VariationController.on('change', this.onChange, this);
        },

        render: function() {

            var areBothVariationsSet = VariationController.areBothVariationsSet();
            var areNeitherVariationsSet = VariationController.areNeitherVariationsSet();

            var variationA, variationB;
            if (areNeitherVariationsSet) {
                variationA = <VariationSelect isEnabled="1" />
                variationB = <VariationSelect />
            } else {
                var property = PropertyMap[VariationController.getPropertyIdAtIndex(0)];
                var variation = VariationController.getVariationByPropertyId(property.id);
                variationA = <EnabledVariation
                                options={variation.options.toJSON()}
                                property_id={property.id}
                                isVariationPriced={variation.get('is_pricing_enabled')}
                                canVariationBePriced="1"
                                label={property.label}
                            />

                if (areBothVariationsSet) {
                    property = PropertyMap[VariationController.getPropertyIdAtIndex(1)];
                    variation = VariationController.getVariationByPropertyId(property.id);

                    variationB = <EnabledVariation
                                    options={variation.options.toJSON()}
                                    property_id={property.id}
                                    label={property.label}
                                />
                } else {
                    variationB = <VariationSelect otherPropertyId={property.id} isEnabled="1" />
                }
            }

            return (
                <div className="variations-collection">
                    <h1>Variations</h1>
                    <p>Use variations to provide options to your buyers</p>
                    {variationA}
                    {variationB}
                </div>
            );
        },

        onChange: function() {
            this.forceUpdate();
        }
    });
});
