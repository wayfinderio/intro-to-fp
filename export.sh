#!/bin/sh

httrack 127.0.0.1:4000 -O intro-to-fp
rm intro-to-fp/hts-log.txt
rm -rf intro-to-fp/hts-cache
rm -rf exercises/node_modules
cp -R exercises intro-to-fp/exercises
rm intro-to-fp.zip
cd intro-to-fp; zip -r ../intro-to-fp.zip *; cd ..
rm -rf intro-to-fp
