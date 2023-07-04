#!/usr/bin/env sh

# re-install bcrypt, to be compatible with the docker container's OS
npm install
npm uninstall bcrypt
npm install bcrypt