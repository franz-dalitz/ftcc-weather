#!/bin/bash
source ./.env
ssh -i ./key.pem $VM_USER@$VM_IP
