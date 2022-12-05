USERNAME ?= $(shell bash -c 'read -p "Username: " username; echo $$username')
PASSWORD ?= $(shell bash -c 'read -s -p "Password: " pwd; echo $$pwd')

help: ## Prints help for targets with comments
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
