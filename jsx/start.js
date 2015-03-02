define(['Variations', 'VariationSet', 'React'], function(Variations, VariationSet, React) {

    var varSet = new VariationSet();
    return function(id) {
        React.render(
            <Variations set={varSet} />,
            document.getElementById(id)
        );
    }
});
