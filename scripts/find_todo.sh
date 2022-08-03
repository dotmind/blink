#!/bin/bash

path=src
todorgxp="@todo|@TODO"
result=$(find $path -type f -print | xargs grep -HiRE $todorgxp)

if [ $? -eq 1 ]; then
  echo "✅"
  exit 0
else
  find $path -type f -print | xargs grep -HiRE $todorgxp
  echo
  echo "❌"
  exit 1
fi