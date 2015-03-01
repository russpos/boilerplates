define(['CommentBox', 'React'], function(CommentBox, React) {
    return function( ) {
        React.render(
            <CommentBox />,
            document.getElementById('content')
        );
    }
});
