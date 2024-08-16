build:
	docker compose build

run:
	docker compose up -d

down:
	docker compose down -v

logs-web:
	docker logs library-service -f

logs-db:
	docker logs library-db -f

fresh-start:
	make down && \
	make build && \
	make run
