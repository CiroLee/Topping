.PHONY: build

WAILS=$$(go env GOPATH)/bin/wails
pwd=$(shell pwd)

build:
	${WAILS} build -u -clean -platform=darwin/amd64,darwin/arm64,windows/amd64,windows/arm64
	mv $(pwd)/build/bin/Topping-arm64.app $(pwd)/build/bin/Topping_$(version)_macos_apple.app
	mv $(pwd)/build/bin/Topping-amd64.app $(pwd)/build/bin/Topping_$(version)_macos_intel.app
	mv $(pwd)/build/bin/Topping-amd64.exe $(pwd)/build/bin/Topping_$(version)_x64.exe	
	mv $(pwd)/build/bin/Topping-arm64.exe $(pwd)/build/bin/Topping_$(version)_arm64.exe