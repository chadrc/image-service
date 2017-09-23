#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

./gradlew clean

./gradlew build

unzip build/distributions/images-service-0.0.1.zip -d build/distributions/

export JAVA_OPTS="-Djava.library.path=$DIR/lib -Dspring.profiles.active=local"

sh build/distributions/images-service-0.0.1/bin/images-service