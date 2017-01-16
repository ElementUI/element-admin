.PHONY: dist build
install:
	@npm install

dev: install
	@npm run dev

build:
	@npm run build

deploy:
	@npm run deploy
