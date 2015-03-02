define([
    'OptionRow',
    'ErrorMessage',
    'React',
    'VariationController'
], function(
    OptionRow,
    ErrorMessage,
    React,
    VariationController
) {

    var ValidateValue = function(value) {
        if (value.length > 16) {
            return 'Message must be less than 16 characters!';
        }
        return false;
    };

    return React.createClass({
        onCancelButtonClick: function() {
            VariationController.cancelVariationWithPropertyId(this.props.property_id);
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
            VariationController.addOptionForPropertyId(this.props.property_id, value);
            this.clearInput();
            this.refresh();
        },

        refresh: function() {
            this.setState({
                error: false,
                isVariationPriced: VariationController.getVariationByPropertyId(this.props.property_id).get('is_pricing_enabled'),
                options: VariationController.getOptionsByPropertyId(this.props.property_id)
            });
        },

        handleOptionRowRemoved: function(property_id, value) {
            VariationController.removeOptionFromPropertyId(property_id, value);
            this.refresh();
        },

        getInitialState: function() {
            return {
                isVariationPriced: this.props.isVariationPriced,
                error: false,
                options: (this.props.options || [])
            };
        },

        onClickEnablePricing: function() {
            VariationController.enablePricingForVariation(this.props.property_id);
            this.refresh();
        },

        onClickDisablePricing: function() {
            VariationController.disablePricingForVariation(this.props.property_id);
            this.refresh();
        },

        render: function() {
            var property_id = this.props.property_id,
                label = this.props.label,
                props = this.props,
                self  = this,
                isVariationPriced = (this.props.canVariationBePriced && this.state.isVariationPriced);
                optionRows = _.map(this.state.options, function(option) {
                    return <OptionRow
                                inStock={option.in_stock}
                                value={option.value}
                                price={option.price}
                                isVariationPriced={isVariationPriced}
                                optionRowRemovedCallback={self.handleOptionRowRemoved}
                                property_id={property_id} />
                    ;
                });
            var errorState;

            var priceHeading = '';
            if (isVariationPriced) {
                priceHeading = <a onClick={this.onClickDisablePricing}>Disable Pricing</a>
            } else if (this.props.canVariationBePriced) {
                priceHeading = <a onClick={this.onClickEnablePricing}>Enable Pricing</a>
            } 
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
                            <td>{priceHeading}</td>
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
