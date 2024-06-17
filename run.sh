#!/bin/bash
rm frontend.log
rm backend.log
screen -L -Logfile frontend.log -dSm frontend npm run --prefix frontend start
screen -L -Logfile backend.log -dSm backend npm run --prefix backend start
