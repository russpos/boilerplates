define([
    'React'
], function(
    React
) {

    return React.createClass({


        render: function() {
            var inStock = this.props.inStock ? 'Yes' : 'No' ;
            return (
                <tr>
                    <td><button onClick={this.onRemoveButtonClick}>X</button></td>
                    <td>{this.props.value}</td>
                    <td>{this.props.price}</td>
                    <td>{inStock}</td>
                </tr>
            );
        }
    });
});
