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

prune:
	docker system prune -af --volumes 

fresh-start:
	make down && \
	make build && \
	make run
