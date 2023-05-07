#!/bin/bash

echo "--- Building development image ---"
docker buildx build ./app/ --tag "lphaap-com-dev"

echo ""

echo -e "--- Starting containers ---"
docker compose up -d