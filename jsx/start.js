define(['Variations', 'React'], function(Variations, React) {

    return function(id) {
        React.render(
            <Variations />,
            document.getElementById(id)
        );
    }
});
