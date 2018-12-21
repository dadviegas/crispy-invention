#!/usr/bin/env bash

openssl req -x509 -newkey rsa:4096 -keyout ./local/server_key.pem -out ./local/server_cert.pem -nodes -days 365 -subj "/CN=localhost/O=Client\ Certificate\ Demo"