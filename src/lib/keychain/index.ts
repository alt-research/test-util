import { DEV_PHRASE, Keyring } from '@polkadot/keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
// import uiKeyring from '@polkadot/ui-keyring'
// import { FileStore } from '@polkadot/ui-keyring/stores'

const DEFAULT_DERIVATION_PATH_PREFIX = "m/44'/60'/0'/0"
// const defaultKeystore = os.homedir() + '/.altlayer/keystore'

// uiKeyring.loadAll({ store: new FileStore(defaultKeystore) })
export async function load() {
  await cryptoWaitReady()
  // ecdsa ethereum
  const eth = new Keyring({ type: 'ethereum' })
  const addEth = (index: number) =>
    eth.addFromUri(`${DEV_PHRASE}/${DEFAULT_DERIVATION_PATH_PREFIX}/${index}`)
  // aura
  const sr = new Keyring({ type: 'sr25519' })
  // grandpa
  const ed = new Keyring({ type: 'ed25519' })

  return {
    eth: {
      keyring: eth,
      alith: addEth(0),
      baltathar: addEth(1),
      charleth: addEth(2),
    },
    sr: {
      keyring: sr,
      alice: sr.addFromUri('//Alice', { name: 'Alice default' }),
      bob: sr.addFromUri('//Bob', { name: 'Bob default' }),
      charlie: sr.addFromUri('//Charlie', { name: 'Charlie default' }),
      eve: sr.addFromUri('//Eve', { name: 'Eve default' }),
    },
    ed: {
      keyring: ed,
      alice: ed.addFromUri('//Alice', { name: 'Alice default' }),
      bob: ed.addFromUri('//Bob', { name: 'Bob default' }),
      charlie: ed.addFromUri('//Charlie', { name: 'Charlie default' }),
      eve: ed.addFromUri('//Eve', { name: 'Eve default' }),
    },
  }
}
