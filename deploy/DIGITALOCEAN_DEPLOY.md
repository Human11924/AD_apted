# Deploy AdaptEd on DigitalOcean

## 1. Create a Droplet

- Ubuntu 24.04 LTS
- Size: at least 2 GB RAM
- Add your SSH key
- Open inbound ports: `22`, `80` (and `443` later if you add SSL)

## 2. Install Docker and Compose plugin

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo $VERSION_CODENAME) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
```

Reconnect SSH after `usermod`.

## 3. Upload project

```bash
git clone <your_repo_url> ADapted_v5000
cd ADapted_v5000/deploy
```

## 4. Configure environment

```bash
cp .env.do.example .env.do
nano .env.do
```

Required values to change at minimum:
- `POSTGRES_PASSWORD`
- `SECRET_KEY`
- `SMTP_*` if you use email features
- `AZURE_SPEECH_*` for pronunciation
- `GEMINI_API_KEY` for AI feedback

## 5. Build and run

```bash
docker compose -f docker-compose.do.yml --env-file .env.do up -d --build
```

Check status:

```bash
docker compose -f docker-compose.do.yml ps
docker compose -f docker-compose.do.yml logs -f backend
```

## 6. Access app

Open in browser:

`http://<DROPLET_IP>`

Frontend is served by Nginx, and API is proxied under `/api`.

## 7. Update deployment

```bash
cd ADapted_v5000
git pull
cd deploy
docker compose -f docker-compose.do.yml --env-file .env.do up -d --build
```

## 8. Optional SSL (recommended)

After domain is pointed to droplet IP, install Certbot and issue cert:

```bash
sudo apt install -y certbot python3-certbot-nginx
```

Then adapt Nginx host config for your domain and run:

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

If you want, I can add a ready-made HTTPS Nginx config and Certbot container setup in this repo next.
