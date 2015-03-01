define([
    'VariationSelect',
    'React'
], function(VariationSelect, React) {

    return React.createClass({

        getInitialState: function() {
            return {};
        },

        componentDidMount: function() {

        },

        render: function() {
            return (
                <div className="variations-collection">
                    <h1>Variations</h1>
                    <p>Use variations to provide options to your buyers</p>
                    <VariationSelect isEnabled="1" />
                    <VariationSelect />
                </div>
            );
        }
    });
});
