import { ApiPromise, WsProvider } from '@polkadot/api'
import type { Hash } from '@polkadot/types/interfaces/runtime'
import * as keychain from './lib/keychain'
import { proposersPayload } from './lib/sudoinit/proposers'
import fs from 'node:fs'

const endpoint = 'ws://127.0.0.1:9944'
async function main() {
    const api = await ApiPromise.create({
        provider: new WsProvider(endpoint),
    })

    const keyring = await keychain.load()
    // let sudoPair: KeyringPair
    const sudoPair = keyring.eth.alith

    const payload = await proposersPayload()

    const wasm = fs.readFileSync(process.argv[2]).toString()
    console.log(`wasm_path: ${process.argv[2]}`)

    await api.isReady
    const tx = api.tx.rollupCodeManagerV2.submitNextCode(0, wasm)
    const extrinsic = api.tx.sudo.sudo(tx)

    let blk = await api.rpc.chain.getBlock()
    console.log('Current block:', blk.block.header.number.toHuman())

    const waiter: Promise<Hash> = new Promise((resolve) => {
        let unsub: () => void
        extrinsic
            .signAndSend(sudoPair, async ({ events = [], status, txHash }) => {
                console.log(`Current status is ${status.type}`)

                if (status.isFinalized) {
                    console.log(`Transaction included in blockHash ${status.asFinalized}`)
                    console.log(`Transaction hash ${txHash.toHex()}`)

                    // Loop through Vec<EventRecord> to display all events
                    for (const {
                        event: { method, section },
                    } of events) {
                        // for (const { phase, event: { data, method, section } } of events) {
                        //   console.debug(`\t' ${phase}: ${section}.${method}:: ${data}`);
                        if (
                            `${section}.${method}` ===
                            'rollupSudoWrapper.RollupSudoInitialized'
                        ) {
                            unsub()
                            resolve(status.asFinalized)
                            return
                        }
                    }

                    unsub()
                }
            })
            .then((u) => {
                unsub = u
            })
    })
    const hash = await waiter
    blk = await api.rpc.chain.getBlock(hash)
    console.log(
        `layer2 proposer change at block: ${blk.block.header.number.toHuman()} (${blk.block.header.hash.toHex()})`,
    )
    await api.disconnect()
    console.log(payload)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
