browser-build:
	gulp browser.build

test:
	NODE_ENV=test mocha test

.PHONY: browser-build test