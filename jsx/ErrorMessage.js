define([
    'React'
], function(React) {
    return React.createClass({
        render: function() {
            return (
                <h4>{this.props.message}</h4>
            )
        }
    });
});
