define([
    'React',
    'VariationController'
], function(
    React,
    VariationController
) {

    return React.createClass({

        getInitialState: function() {
            return {
                price: this.props.price,
                inStock: this.props.inStock
            };
        },

        onRemoveButtonClick: function() {
            this.props.optionRowRemovedCallback(this.props.property_id, this.props.value);

        },

        onPriceInputKeyPress: function() {
            var state = this.state;
            this.setState(_.extend(state, {
                price: this.refs.price.getDOMNode().value
            }));
        },

        render: function() {
            var inStock = this.state.inStock ? 'Yes' : 'No' ;

            var priceColumn = (this.props.isVariationPriced) ?
                <input onChange={this.onPriceInputKeyPress} ref="price" type="text" defaultValue={this.state.price} /> : '';
            return (
                <tr>
                    <td><button onClick={this.onRemoveButtonClick}>X</button></td>
                    <td>{this.props.value}</td>
                    <td>{priceColumn}</td> 
                    <td></td>
                    <td>{inStock}</td>
                </tr>
            );
        }
    });
});
