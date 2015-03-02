define([
    'underscore',
    'PropertyMap',
    'React',
    'VariationController'
], function(
    _,
    PropertyMap,
    React,
    VariationController
) {
    return React.createClass({

        onChange: function(event) {
            VariationController.addVariationForPropertyId(parseInt(event.target.value, 10));
        },

        render: function() {
            var options = [];
            var otherProperty = this.props.otherPropertyId;
            _.each(PropertyMap, function(property) {
                var disabled = (property.id == otherProperty);
                options.push(
                    <option disabled={disabled} key={property.id} value={property.id}>{property.label}</option>
                );
            });
            var isDisabled = this.props.isEnabled ? 0 : 1;
            return (
                <select defaultValue="0" disabled={isDisabled} onChange={this.onChange}>
                    <option value="0">Choose a property</option>
                        {options}
                </select>
            );
        }
    });

});
