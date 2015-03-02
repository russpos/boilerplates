define([
    'VariationSelect',
    'EnabledVariation',
    'React'
], function(VariationSelect, EnabledVariation, React) {

    return React.createClass({

        getInitialState: function() {
            return {};
        },

        componentDidMount: function() {
            this.props.set.on('change', this.forceUpdate, this);
        },

        render: function() {

            var isFirstVariationSet = this.props.set.primaryProperty.property_id;
            var isSecondVariationSet = this.props.set.secondaryProperty.property_id;
            var areBothVariationsSet = (isFirstVariationSet && isSecondVariationSet);
            var areNeitherVariationsSet = (!isFirstVariationSet && !isSecondVariationSet);

            var variationA, variationB;
            if (areNeitherVariationsSet) {
                variationA = <VariationSelect isEnabled="1" variation={this.props.set.primaryProperty} />
                variationB = <VariationSelect variation={this.props.set.secondaryProperty} />
            } else if (areBothVariationsSet) {
                variationA = <EnabledVariation variation={this.props.primaryProperty} />
                variationB = <EnabledVariation variation={this.props.secondaryProperty} />
            } else {
                var a = isFirstVariationSet ? this.props.set.primaryProperty : this.props.set.secondaryProperty;
                var b = isFirstVariationSet ? this.props.set.secondaryProperty : this.props.set.primaryProperty;

                variationA = <EnabledVariation variation={a} />
                variationB = <VariationSelect isEnabled="1" variation={b} />
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
