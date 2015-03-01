define([
    '_',
    'PropertyMap',
    'React'
], function(
    _,
    PropertyMap,
    React
) {
    return React.createClass({

        onChange: function() {
            debugger;
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
