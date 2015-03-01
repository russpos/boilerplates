serve:
	cd public && python -m SimpleHTTPServer 8888

compile-jsx:
	jsx --watch jsx public/js
