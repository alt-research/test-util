## usage

1. copy binaries to `./bin`, including `alt-beacon` and `altrollup-template-node`
2. export genesis_commit and validation code
```bash
./bin/altrollup-template-node export-genesis-wasm --chain genesis.json > ./bin/producer_code.wasm
./bin/altrollup-template-node export-genesis-commit --chain genesis.json > ./bin/producer_genesis_commit
```
3. prepare `genesis.json`
```
./bin/altrollup-template-node build-spec --chain=dev --raw > genesis.json
```
4. launch all nodes (beacon,ganache,3 x proudcers) and do sudo-initialize: `./run.sh`
5. then you can do `authority change` or `code update` as described below.

### auth change

`npx ts-node src/authority-change.ts`

this command will change authority to `charlie, bob, alice`

### code update
`npx ts-node src/code-update.ts <path_to_producer_code>`

this command will submit a new wasm code

### sudo init

you can also do sudo-init manually: 

`npx ts-node src/sudo-init.ts <path_to_validateion_code> <path_to_genesis_commit>`

this command will do sudo-initialize with payload defined in `src/lib/sudoinit/templatechain.ts`, with `rollupid = 0`,
`owner = alice` , and `alice, bob, charlie` as proposers
