export type BitcoinNetwork = "mainnet" | "testnet" | "regtest" | "signet";

interface BitcoinCliConfig {
  network: BitcoinNetwork;
  rpcuser: string;
  rpcpassword: string;
  rpcport?: number;
  rpchost: string;
  rpcwallet?: string;
}
interface BlockchainInfo {
  chain: string;
  blocks: number;
  headers: number;
  bestblockhash: string;
  difficulty: number;
  mediantime: number;
  verificationprogress: number;
  initialblockdownload: boolean;
  chainwork: string;
  size_on_disk: number;
  pruned: boolean;
  warnings: string;
}

interface BlockInfo {
  hash: string;
  confirmations: number;
  size: number;
  strippedsize: number;
  weight: number;
  height: number;
  version: number;
  versionHex: string;
  merkleroot: string;
  tx: TransactionInfo[];
  time: number;
  mediantime: number;
  nonce: number;
  bits: string;
  difficulty: number;
  chainwork: string;
  nTx: number;
  previousblockhash: string;
  nextblockhash?: string;
}

interface BlockStats {
  avgfee: number;
  avgfeerate: number;
  avgtxsize: number;
  blockhash: string;
  feerate_percentiles: number[];
  height: number;
  ins: number;
  maxfee: number;
  maxfeerate: number;
  maxtxsize: number;
  medianfee: number;
  mediantime: number;
  mediantxsize: number;
  minfee: number;
  minfeerate: number;
  mintxsize: number;
  outs: number;
  subsidy: number;
  swtotal_size: number;
  swtotal_weight: number;
  swtxs: number;
  time: number;
  total_out: number;
  total_size: number;
  total_weight: number;
  totalfee: number;
  txs: number;
  utxo_increase: number;
  utxo_size_inc: number;
}

interface TransactionInfo {
  txid: string;
  hash: string;
  version: number;
  size: number;
  vsize: number;
  weight: number;
  locktime: number;
  vin: TxInput[];
  vout: TxOutput[];
  hex: string;
  blockhash?: string;
  confirmations?: number;
  time?: number;
  blocktime?: number;
}

interface TxInput {
  txid: string;
  vout: number;
  scriptSig: {
    asm: string;
    hex: string;
  };
  sequence: number;
  txinwitness?: string[];
}

interface TxOutput {
  value: number;
  n: number;
  scriptPubKey: {
    asm: string;
    hex: string;
    reqSigs?: number;
    type: string;
    addresses?: string[];
    address?: string;
  };
}

interface MempoolInfo {
  loaded: boolean;
  size: number;
  bytes: number;
  usage: number;
  maxmempool: number;
  mempoolminfee: number;
  minrelaytxfee: number;
}

interface MempoolEntry {
  fees: {
    base: number;
    modified: number;
    ancestor: number;
    descendant: number;
  };
  size: number;
  fee: number;
  modifiedfee: number;
  time: number;
  height: number;
  descendantcount: number;
  descendantsize: number;
  descendantfees: number;
  ancestorcount: number;
  ancestorsize: number;
  ancestorfees: number;
  depends: string[];
}

interface NetworkInfo {
  version: number;
  subversion: string;
  protocolversion: number;
  localservices: string;
  localrelay: boolean;
  timeoffset: number;
  connections: number;
  networkactive: boolean;
  networks: Network[];
  relayfee: number;
  incrementalfee: number;
}

interface Network {
  name: string;
  limited: boolean;
  reachable: boolean;
  proxy: string;
  proxy_randomize_credentials: boolean;
}

interface PeerInfo {
  id: number;
  addr: string;
  addrbind: string;
  addrlocal: string;
  services: string;
  relaytxes: boolean;
  lastsend: number;
  lastrecv: number;
  bytessent: number;
  bytesrecv: number;
  conntime: number;
  timeoffset: number;
  pingtime: number;
  minping: number;
  version: number;
  subver: string;
  inbound: boolean;
  addnode: boolean;
  startingheight: number;
  banscore: number;
  synced_headers: number;
  synced_blocks: number;
}

interface UnspentOutput {
  txid: string;
  vout: number;
  address: string;
  label: string;
  scriptPubKey: string;
  amount: number;
  confirmations: number;
  spendable: boolean;
  solvable: boolean;
  desc: string;
  safe: boolean;
}

export type {
  BitcoinCliConfig,
  BlockInfo,
  BlockStats,
  TransactionInfo,
  TxInput,
  TxOutput,
  MempoolInfo,
  MempoolEntry,
  NetworkInfo,
  Network,
  PeerInfo,
  UnspentOutput,
  BlockchainInfo,
};
