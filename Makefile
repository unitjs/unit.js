REPORTER = spec

test:
	@NODE_ENV=test node ./bin/test \
	--reporter $(REPORTER) \
	--recursive

.PHONY: test