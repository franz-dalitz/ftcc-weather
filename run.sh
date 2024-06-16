#!/bin/bash
screen -dSm frontend npm run --prefix frontend start
screen -dSm backend npm run --prefix backend start
