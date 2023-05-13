#!/bin/bash

source ./kill.sh

./bin/alt-beacon --dev --port=12122 --tmp > beacon.log 2>&1 &

ganache -b 1 > ganache.log 2>&1 &

echo "Start SudoInitialize ..."
npx ts-node src/sudo-init.ts ./bin/producer_code.wasm ./bin/producer_genesis_commit

RUST_LOG=runtime=debug ./bin/altrollup-template-node --chain=genesis.json --alice --port=40000 --ws-port=40001 --rpc-port=40002 --beacon-ws-urls=ws://127.0.0.1:9944 --eth-http-url=http://127.0.0.1:8545 --eth-finality-depth=5 --eth-deposit-contract=0x0000000000000000000000000000000000000000 --tmp > alice.log 2>&1 &

RUST_LOG=runtime=debug ./bin/altrollup-template-node --chain=genesis.json --bob --port=40010 --ws-port=40011 --rpc-port=40012 --beacon-ws-urls=ws://127.0.0.1:9944 --eth-http-url=http://127.0.0.1:8545 --eth-finality-depth=5 --eth-deposit-contract=0x0000000000000000000000000000000000000000 --tmp > bob.log 2>&1 &

RUST_LOG=runtime=debug ./bin/altrollup-template-node --chain=genesis.json --charlie --port=40020 --ws-port=40021 --rpc-port=40022 --beacon-ws-urls=ws://127.0.0.1:9944 --eth-http-url=http://127.0.0.1:8545 --eth-finality-depth=5 --eth-deposit-contract=0x0000000000000000000000000000000000000000 --tmp > charlie.log 2>&1 &

