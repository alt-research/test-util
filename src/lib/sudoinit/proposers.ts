import * as polkadotUtil from '@polkadot/util'
import * as keychain from '../keychain'
import { AuthorityChangePayload } from './interface'
import fs from 'node:fs'

const validationCode = fs.readFileSync('/home/wenxing/workspace/producer_code.wasm').toString()
const genesisCommit = fs.readFileSync('/home/wenxing/workspace//producer_genesis_commit').toString()

export async function proposersPayload(): Promise<AuthorityChangePayload> {
    const keyring = await keychain.load()
    return {
        rollupId: 0,
        ids: [keyring.eth.charleth.address, keyring.eth.baltathar.address]
    }
}
