## The Makefile includes instructions on environment setup and lint tests
# Install dependencies in package.json
# Dockerfile should pass hadolint
# (Optional) Build a simple integration test



install:
	# This should be run from inside the current directory
	npm install

test:
	# Additional, optional, runs integration test and unit test
	npm test

lint:
	# See local hadolint install instructions:   https://github.com/hadolint/hadolint
	# This is linter for Dockerfiles
	hadolint Dockerfile

all: install lint test