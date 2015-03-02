define([
    'React'
], function(React) {
    return React.createClass({
        onCancelButtonClick: function() {
            this.props.variation.reset();
        },

        render: function() {
            var property = this.props.variation.getProperty();

            return (
                <div>
                    <h2>{property.label}</h2>
                    <button onClick={this.onCancelButtonClick}>Cancel</button>
                    <table>
                        <th>
                            <td>Name</td>
                            <td>Pricing</td>
                            <td>Stock</td>
                        </th>
                    </table>
                </div>
            );
        }
    });
});
