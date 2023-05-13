export interface SudoInitPayload {
    rollupId: number
    owner: string
    genesis: GenesisInfo
}

export interface AuthorityChangePayload {
    rollupId: number
    ids: string[]
}

interface GenesisInfo {
    validationCode: string
    genesisCommit: string
    checkForCommit: boolean
    sortProposersByAccountid: boolean
    accountIdType: AccountIdType | string
    consensusType: ConsensusType | string
    proposers: ProposerVec[]
    verifiers: string[]
}

type ProposerVec = [accountId20: string, info: ProposerInfo]

interface ProposerInfo {
    proposer: {
        AccountId32: string
    }
    keys_: {
        aura: string
        grandpa: [string, number]
    }
}

enum AccountIdType {
    Number = 'Number',
    AccountId20 = 'AccountId20',
    AccountId32 = 'AccountId32',
}

enum ConsensusType {
    Aura = 'Aura',
    ManualSeal = 'ManualSeal',
}
