#!/usr/bin/env bash

# Code push
if [ -n "${CODE_PUSH_TOKEN+set}" ]; then
	./node_modules/.bin/code-push login --accessKey "${CODE_PUSH_TOKEN}" 
	./node_modules/.bin/code-push release-react usift-app android
	./node_modules/.bin/code-push logout
fi

# OwnCloud
if [ -n "${OWNCLOUD_CRED+set}" ]; then
  curl -X PUT -u "${OWNCLOUD_CRED}" "http://5.135.161.138:3003/remote.php/webdav/public/ushift-app/release-${TRAVIS_TAG}.apk" --data-binary @"android/app/build/outputs/apk/app-release.apk"
  curl -X PUT -u "${OWNCLOUD_CRED}" "http://5.135.161.138:3003/remote.php/webdav/public/ushift-app/release-latest.apk" --data-binary @"android/app/build/outputs/apk/app-release.apk"
fi
