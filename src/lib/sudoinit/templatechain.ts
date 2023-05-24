import * as polkadotUtil from '@polkadot/util'
import * as keychain from '../keychain'
import { SudoInitPayload } from './interface'
import fs from 'node:fs'

export async function templateChainPayload(
  wasm_path: string,
  genesis_commit: string,
): Promise<SudoInitPayload> {
  const validationCode = fs.readFileSync(wasm_path).toString()
  const genesisCommit = fs.readFileSync(genesis_commit).toString()

  const keyring = await keychain.load()
  return {
    rollupId: 0,
    owner: keyring.eth.alith.address,
    genesis: {
      validationCode: validationCode,
      genesisCommit: genesisCommit,
      checkForCommit: true,
      proposers: [
        [
          keyring.eth.alith.address,
          {
            proposer: {
              AccountId32:
                '0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d',
            },
            keys_: {
              aura: polkadotUtil.u8aToHex(keyring.sr.alice.publicKey),
              grandpa: [polkadotUtil.u8aToHex(keyring.ed.alice.publicKey), 1],
            },
          },
        ],
        [
          keyring.eth.baltathar.address,
          {
            proposer: {
              AccountId32:
                '0x8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48',
            },
            keys_: {
              aura: polkadotUtil.u8aToHex(keyring.sr.bob.publicKey),
              grandpa: [polkadotUtil.u8aToHex(keyring.ed.bob.publicKey), 1],
            },
          },
        ],
        [
          keyring.eth.charleth.address,
          {
            proposer: {
              AccountId32:
                '0x90b5ab205c6974c9ea841be688864633dc9ca8a357843eeacf2314649965fe22',
            },
            keys_: {
              aura: polkadotUtil.u8aToHex(keyring.sr.charlie.publicKey),
              grandpa: [polkadotUtil.u8aToHex(keyring.ed.charlie.publicKey), 1],
            },
          },
        ],
      ],
      verifiers: [keyring.eth.alith.address],
      sortProposersByAccountid: true,
      accountIdType: 'AccountId32',
      consensusType: 'Aura',
    },
  }
}
