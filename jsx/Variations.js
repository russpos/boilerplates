define([
    'VariationSelect',
    'EnabledVariation',
    'React',
    'PropertyMap'
], function(VariationSelect, EnabledVariation, React, PropertyMap) {

    return React.createClass({

        getInitialState: function() {
            return {};
        },

        componentDidMount: function() {
            this.props.set.on('change', this.forceUpdate, this);
        },

        render: function() {
            var set = this.props.set;

            var areBothVariationsSet = (set.properties.length == 2);
            var areNeitherVariationsSet = !(set.properties.length);

            var variationA, variationB;
            if (areNeitherVariationsSet) {
                variationA = <VariationSelect set={set} isEnabled="1" />
                variationB = <VariationSelect set={set} />
            } else {
                var property = PropertyMap[set.properties[0]];
                var variation = set.byProperty[property.id];
                variationA = <EnabledVariation
                                set={set}
                                options={variation.options}
                                property_id={property.id}
                                label={property.label}
                            />

                if (areBothVariationsSet) {
                    property = PropertyMap[set.properties[1]];
                    variation = set.byProperty[property.id];

                    variationB = <EnabledVariation
                                    set={set}
                                    options={variation.options}
                                    property_id={property.id}
                                    label={property.label}
                                />
                } else {
                    variationB = <VariationSelect  set={set} otherPropertyId={property.id} isEnabled="1" />
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
        }
    });
});
