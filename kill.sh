#!/bin/bash

echo "Kill all nodes ..."
ps aux | grep "alt-beacon" | awk '{print $2}' | xargs kill -9 || true
ps aux | grep "altrollup-template-node" | awk '{print $2}' | xargs kill -9 || true
ps aux | grep "ganache" | awk '{print $2}' | xargs kill -9 || true
echo "Done!"
