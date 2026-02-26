
APP=base-react-v2
REPO_NAME=${APP}
VERSION=v0.0.1
TAG=${VERSION}
COMMIT=$$(git rev-parse --short HEAD)
REMOTE=origin

IPORT=8080
PORT=3000

# Create file (.env.dev , .env.cert and .env.prod) from env.example.
# dev, cert, prod (eg => MODE=dev ).
MODE=dev

# git
log:
	git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative

st:
	git status -sb

# install
install:
	npm install -g bun & bun install

#pwsh manual, set before (Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass)
run:
	powershell.exe -Command "$$env:NODE_ENV='development'; bun run dev --port ${PORT} --mode ${MODE}"

# bash run
brun:
	NODE_ENV=development bun run dev --port ${PORT} --mode ${MODE}

#build
build:
	bun run build --mode dev