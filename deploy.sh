#!/usr/bin/env bash
REPO_NAME=`echo $TRAVIS_REPO_SLUG |  cut -d \/ -f 2`
FILE_PATH="android/app/build/outputs/apk/app-release.apk"

# Code push
if [ -n "${CODE_PUSH_TOKEN+set}" ]; then
	./node_modules/.bin/code-push login --accessKey "${CODE_PUSH_TOKEN}" 
	./node_modules/.bin/code-push release-react usift-app android
	./node_modules/.bin/code-push logout
fi

# OwnCloud
if [ -n "${OWNCLOUD_CRED+set}" ]; then
  URL="http://c.thomas.sh/remote.php/webdav/public/${REPO_NAME}"
  
  if [ -n "${TRAVIS_TAG+set}" ] && [ -z "${TRAVIS_TAG}"]; then
    curl -X PUT -u "${OWNCLOUD_CRED}" "${URL}/release-latest.zip" --data-binary @"${FILE_PATH}"
    curl -X PUT -u "${OWNCLOUD_CRED}" "${URL}/release-${TRAVIS_TAG}.zip" --data-binary @"${FILE_PATH}"
  else
    curl -X PUT -u "${OWNCLOUD_CRED}" "${URL}/beta-latest.zip" --data-binary @"${FILE_PATH}"
    curl -X PUT -u "${OWNCLOUD_CRED}" "${URL}/beta-${TRAVIS_COMMIT}.zip" --data-binary @"${FILE_PATH}"
  fi
fi
