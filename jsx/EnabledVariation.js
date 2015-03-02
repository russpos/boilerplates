define([
    'OptionRow',
    'ErrorMessage',
    'React'
], function(
    OptionRow,
    ErrorMessage,
    React
) {

    var ValidateValue = function(value) {
        if (value.length > 16) {
            return 'Message must be less than 16 characters!';
        }
        return false;
    };

    return React.createClass({
        onCancelButtonClick: function() {
            this.props.set.cancelProperty(this.props.property_id);
        },

        clearInput: function() {
            var dom = this.refs.optionInput.getDOMNode();
            dom.value = "";
            dom.focus();
        },

        getInputValue: function() {
            return this.refs.optionInput.getDOMNode().value.trim();
        },

        onInputKeyPress: function(e) {
            if (e.charCode == 13) {
                this.onAddOptionButtonClick();
                return false;
            }
            this.onInputModify();
        },

        onInputModify: function() {
            var value = this.getInputValue();
            this.setError(ValidateValue(value));
        },

        setError: function(error) {
            var state = this.state;
            this.setState(_.extend(state, {
                error: error
            }));
        },

        onAddOptionButtonClick: function() {
            if (this.state.error) {
                return false;
            }
            var value = this.getInputValue();
            if (!value) {
                return;
            }
            this.props.set.addOption(this.props.property_id, value);
            this.clearInput();
            this.setState({
                error: false,
                options: this.props.set.getOptions(this.props.property_id)
            });
        },

        getInitialState: function() {
            return {
                error: false,
                options: (this.props.options || [])
            };
        },

        render: function() {
            var property_id = this.props.property_id,
                label = this.props.label,
                optionRows = _.map(this.state.options, function(option) {
                    return <OptionRow
                                inStock={option.in_stock}
                                value={option.value}
                                price={option.price}
                                property_id={property_id} />
                    ;
                });
            var errorState;
            if (this.state.error) {
                errorState = <ErrorMessage message={this.state.error} />;
            }
            return (
                <div>
                    <h2>{label}</h2>
                    <button onClick={this.onCancelButtonClick}>Cancel</button>
                    <table>
                        <th>
                            <td>Name</td>
                            <td>Pricing</td>
                            <td>Stock</td>
                        </th>
                        {optionRows}
                    </table>
                    {errorState}
                    <input onKeyPress={this.onInputKeyPress} ref="optionInput" type="text" placeholder="Enter an option..." />
                    <button onClick={this.onAddOptionButtonClick}>Add option</button>
                </div>
            );
        }
    });
});
