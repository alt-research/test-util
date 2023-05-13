#!/bin/bash
killall alt-beacon
killall altrollup-template-node
killall ganache

ps aux | grep "alt-beacon" | awk '{print $2}' | xargs kill -9 || true
ps aux | grep "altrollup-template-node" | awk '{print $2}' | xargs kill -9 || true
ps aux | grep "ganache" | awk '{print $2}' | xargs kill -9 || true
