#!/usr/bin/env bash
REPO_NAME=`echo $TRAVIS_REPO_SLUG |  cut -d \/ -f 2`
FILE_PATH="android/app/build/outputs/apk/app-release.apk"

# Code push
if [ ! -z "${CODE_PUSH_TOKEN}" ]; then
	./node_modules/.bin/code-push login --accessKey "${CODE_PUSH_TOKEN}" 
	./node_modules/.bin/code-push release-react usift-app android
	./node_modules/.bin/code-push logout
fi

# OwnCloud
if [ ! -z "${OWNCLOUD_CRED}" ]; then
  URL="http://c.thomas.sh/remote.php/webdav/public/${REPO_NAME}"
  
  if [ ! -z "${TRAVIS_TAG}" && "${TRAVIS_BRANCH}" == "master" ]; then
    curl -X PUT -u "${OWNCLOUD_CRED}" "${URL}/release-latest.apk" --data-binary @"${FILE_PATH}"
    curl -X PUT -u "${OWNCLOUD_CRED}" "${URL}/release-${TRAVIS_TAG}.apk" --data-binary @"${FILE_PATH}"
  elif [ "${TRAVIS_BRANCH}" == "develop" ]
    curl -X PUT -u "${OWNCLOUD_CRED}" "${URL}/beta-latest.apk" --data-binary @"${FILE_PATH}"
    curl -X PUT -u "${OWNCLOUD_CRED}" "${URL}/beta-${TRAVIS_COMMIT}.apk" --data-binary @"${FILE_PATH}"
  fi
fi
