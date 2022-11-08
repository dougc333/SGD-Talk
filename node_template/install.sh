#!/bin/bash

cat requirements.txt | xargs npm install 

./node_modules/typescript/bin/tsc --init



