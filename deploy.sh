npm run docker:build
ssh tw "rm -rf ~/network-area"
ssh tw "mkdir -p ~/network-area"
scp docker-compose.production.yml tw:~/network-area/docker-compose.yml
scp network-area-images.tar .env tw:~/network-area/
scp -r api/seeds tw:~/network-area/seeds
ssh tw "cd ~/network-area && docker load -i network-area-images.tar && docker compose up -d"