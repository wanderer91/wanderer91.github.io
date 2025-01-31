build:
	docker build -t my-page:latest .
run:
	docker run -d -p 9000:9000 -v mypage_node_modules:/var/www/app/node_modules/ -v .:/var/www/app -w /var/www/app --name my-page my-page:latest
stop:
	docker stop my-page && docker rm -f my-page
run-prod:
	docker run -d -e MODE=production -p 9000:9000 -v mypage_node_modules:/var/www/app/node_modules/ -v .:/var/www/app -w /var/www/app --name my-page my-page:latest
stop-prod:
	docker rm -f my-page