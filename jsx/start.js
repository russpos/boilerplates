define(['CommentBox', 'React'], function(CommentBox, React) {
    return function(id) {
        React.render(
            <V />,
            document.getElementById(id)
        );
    }
});
