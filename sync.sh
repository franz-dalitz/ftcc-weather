#!/bin/bash
source ./.env \
&& rsync -rve 'ssh -i ./key.pem' ./backend/index.js ./backend/package.json $VM_USER@$VM_IP:$VM_PROJECT_PATH/backend/ \
&& rsync -rve 'ssh -i ./key.pem' ./frontend/index.html ./frontend/index.js ./frontend/package.json ./frontend/style.scss ./frontend/weather.ico $VM_USER@$VM_IP:$VM_PROJECT_PATH/frontend/ \
&& rsync -rve 'ssh -i ./key.pem' ./run.sh ./stop.sh $VM_USER@$VM_IP:$VM_PROJECT_PATH
