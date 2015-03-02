define([
    'underscore',
    'PropertyMap',
    'React'
], function(
    _,
    PropertyMap,
    React
) {
    return React.createClass({

        onChange: function(event) {
            console.log('> Changd');
            this.props.variation.setProperty(event.target.value);
        },

        render: function() {
            var options = [];
            _.each(PropertyMap, function(property) {
                options.push(
                    <option key={property.id} value={property.id}>{property.label}</option>
                );
            });
            var isDisabled = this.props.isEnabled ? 0 : 1;
            return (
                <select disabled={isDisabled} onChange={this.onChange}>
                    <option selected="true" value="0">Choose a property</option>
                    <optgroup label="Choose a property">
                        {options}
                    </optgroup>
                </select>
            );
        }
    });

});
