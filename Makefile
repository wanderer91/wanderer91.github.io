build:
	docker build -t my-page:latest .
dev:
	docker run \
		--rm \
		-d \
		-e MODE=development \
		-p 9000:9000 \
		-v .:/var/www/app \
		--name my-page my-page:latest
webp-convert:
	docker exec -it my-page sh -c "npm run webp-convert"
prod:
	docker run \
		--rm \
		-d \
		-e MODE=production \
		-p 9000:9000 \
		-v .:/var/www/app \
		--name my-page my-page:latest
stop:
	docker container stop my-page