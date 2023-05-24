import * as keychain from '../keychain'
import { AuthorityChangePayload } from './interface'

export async function proposersPayload(): Promise<AuthorityChangePayload> {
  const keyring = await keychain.load()
  return {
    rollupId: 0,
    ids: [
      keyring.eth.charleth.address,
      keyring.eth.baltathar.address,
      keyring.eth.alith.address,
    ],
  }
}
