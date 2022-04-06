#!/bin/sh

VERSION=website2020@1.0.0
export SENTRY_PROJECT=james-cote

SCRIPT=./script.js

if ! [ -f $SCRIPT ]; then
    >&2 echo "Website script cannot be found. Aborting upload..."
    exit 1
fi

sentry-cli releases --org james-cote new $VERSION
sentry-cli releases --org james-cote files $VERSION upload-sourcemaps $SCRIPT
