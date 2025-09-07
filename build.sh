#! /bin/sh

docker build -t baidu-map-demo-vue2.5:$1 . &
docker push sunday90/baidu-map-demo-vue2.5:$1
