import { exec } from "child_process";
import { promisify } from "util";

import {
  BitcoinCliConfig,
  BitcoinNetwork,
  BlockchainInfo,
  BlockInfo,
  BlockStats,
  MempoolEntry,
  MempoolInfo,
  NetworkInfo,
  PeerInfo,
  TransactionInfo,
  UnspentOutput,
} from "@/types/bitcoin-cli";
import {
  RPC_HOST,
  RPC_USER,
  RPC_PASSWORD,
  NETWORK,
  RPC_PORT,
  BITCOIN_CLI_PATH,
} from "@/config/process";

const execAsync = promisify(exec);

const DEFAULT_CONFIG: BitcoinCliConfig = {
  network: NETWORK as BitcoinNetwork,
  rpcuser: RPC_USER,
  rpcpassword: RPC_PASSWORD,
  rpcport: Number(RPC_PORT),
  rpchost: RPC_HOST,
};

export class BitcoinCLI {
  private config: BitcoinCliConfig;
  private baseCommand: string;

  constructor(config: Partial<BitcoinCliConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.baseCommand = this.buildBaseCommand();
  }

  private buildBaseCommand(): string {
    const networkFlag =
      this.config.network === "mainnet" ? "" : `-${this.config.network}`;
    return `${BITCOIN_CLI_PATH} ${networkFlag} -rpcconnect=${this.config.rpchost} -rpcuser=${this.config.rpcuser} -rpcpassword=${this.config.rpcpassword} -rpcport=${this.config.rpcport} -rpcwallet=extheoisah`;
  }

  private async executeCommand<T>(command: string): Promise<T> {
    try {
      const { stdout, stderr } = await execAsync(
        `${this.baseCommand} ${command}`,
        {
          maxBuffer: 10 * 1024 * 1024, // 10MB buffer
          timeout: 30000, // 30 second timeout
        }
      );
      if (stderr) {
        throw new Error(stderr);
      }

      // Handle string responses (like hashes)
      if (
        typeof stdout === "string" &&
        !stdout.startsWith("{") &&
        !stdout.startsWith("[")
      ) {
        return stdout.trim() as unknown as T;
      }

      try {
        return JSON.parse(stdout.trim()) as T;
      } catch (error: unknown) {
        console.error("Failed to parse JSON:", stdout);
        const message =
          error instanceof Error ? error.message : "Unknown parsing error";
        throw new Error(`Failed to parse bitcoin-cli output: ${message}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Bitcoin CLI Error: ${error.message}`);
      }
      throw error;
    }
  }

  // Block-related commands
  async getBlockCount(): Promise<number> {
    return this.executeCommand<number>("getblockcount");
  }

  async getBlockHash(height: number): Promise<string> {
    return this.executeCommand<string>(`getblockhash ${height}`);
  }

  async getBlock(hash: string, verbosity = 2): Promise<BlockInfo> {
    return this.executeCommand<BlockInfo>(`getblock ${hash} ${verbosity}`);
  }

  async getBlockStats(hashOrHeight: string | number): Promise<BlockStats> {
    return this.executeCommand<BlockStats>(`getblockstats ${hashOrHeight}`);
  }

  // Chain-related commands
  async getBestBlockHash(): Promise<string> {
    return this.executeCommand<string>("getbestblockhash");
  }

  async getChainTips(): Promise<
    { height: number; hash: string; branchlen: number; status: string }[]
  > {
    return this.executeCommand<
      { height: number; hash: string; branchlen: number; status: string }[]
    >("getchaintips");
  }

  async getDifficulty(): Promise<number> {
    return this.executeCommand<number>("getdifficulty");
  }

  // Mempool-related commands
  async getMempoolInfo(): Promise<MempoolInfo> {
    return this.executeCommand<MempoolInfo>("getmempoolinfo");
  }

  async getRawMempool(
    verbose = false
  ): Promise<string[] | Record<string, MempoolEntry>> {
    return this.executeCommand(`getrawmempool ${verbose}`);
  }

  async getMempoolEntry(txid: string): Promise<MempoolEntry> {
    return this.executeCommand<MempoolEntry>(`getmempoolentry ${txid}`);
  }

  // Transaction-related commands
  async getRawTransaction(
    txid: string,
    verbosity?: 0 | 1 | 2,
    blockhash?: string
  ): Promise<TransactionInfo> {
    const command = blockhash
      ? `getrawtransaction ${txid} ${verbosity || 1} ${blockhash}`
      : `getrawtransaction ${txid} ${verbosity || 1}`;
    return this.executeCommand<TransactionInfo>(command);
  }

  async decodeRawTransaction(hexstring: string): Promise<TransactionInfo> {
    return this.executeCommand<TransactionInfo>(
      `decoderawtransaction ${hexstring}`
    );
  }

  // Network-related commands
  async getNetworkInfo(): Promise<NetworkInfo> {
    return this.executeCommand<NetworkInfo>("getnetworkinfo");
  }

  async getPeerInfo(): Promise<PeerInfo[]> {
    return this.executeCommand<PeerInfo[]>("getpeerinfo");
  }

  // Mining-related commands
  async generateToAddress(nblocks: number, address: string): Promise<string[]> {
    return this.executeCommand<string[]>(
      `generatetoaddress ${nblocks} ${address}`
    );
  }

  async getBlockTemplate(): Promise<{
    version: number;
    rules: string[];
    vbavailable: Record<string, number>;
    vbrequired: number;
    previousblockhash: string;
    transactions: TransactionInfo[];
    coinbaseaux: Record<string, string>;
    coinbasevalue: number;
    longpollid: string;
    target: string;
    mintime: number;
    mutable: string[];
    noncerange: string;
    sigoplimit: number;
    sizelimit: number;
    weightlimit: number;
    curtime: number;
    bits: string;
    height: number;
  }> {
    return this.executeCommand('getblocktemplate \'{"rules": ["segwit"]}\'');
  }

  // Wallet-related commands
  async getNewAddress(label = "", addressType = "bech32"): Promise<string> {
    return this.executeCommand<string>(
      `getnewaddress "${label}" "${addressType}"`
    );
  }

  async getBalance(minconf = 1): Promise<number> {
    return this.executeCommand<number>(`getbalance "*" ${minconf}`);
  }

  async sendToAddress(
    address: string,
    amount: number,
    comment = ""
  ): Promise<string> {
    return this.executeCommand<string>(
      `sendtoaddress ${address} ${amount} "${comment}"`
    );
  }

  async listUnspent(minconf = 1, maxconf = 9999999): Promise<UnspentOutput[]> {
    return this.executeCommand<UnspentOutput[]>(
      `listunspent ${minconf} ${maxconf}`
    );
  }

  async getBlockchainInfo(): Promise<BlockchainInfo> {
    return this.executeCommand<BlockchainInfo>("getblockchaininfo");
  }

  // Address-related commands
  async validateAddress(address: string): Promise<{
    isvalid: boolean;
    address: string;
    scriptPubKey: string;
    isscript: boolean;
    iswitness: boolean;
    witness_version?: number;
    witness_program?: string;
  }> {
    return this.executeCommand(`validateaddress ${address}`);
  }

  async scanTxOutset(address: string): Promise<{
    success: boolean;
    total_amount: number;
    txouts: number;
    height: number;
    bestblock: string;
    unspents: Array<{
      txid: string;
      vout: number;
      scriptPubKey: string;
      desc: string;
      amount: number;
      height: number;
    }>;
  }> {
    return this.executeCommand(`scantxoutset start '["addr(${address})"]'`);
  }

  async listReceivedByAddress(
    address: string,
    minconf = 1
  ): Promise<
    Array<{
      address: string;
      amount: number;
      confirmations: number;
      label: string;
      txids: string[];
    }>
  > {
    return this.executeCommand(
      `listreceivedbyaddress ${minconf} true true "${address}"`
    );
  }

  async getAddressOverview(address: string): Promise<{
    address: string;
    isvalid: boolean;
    scriptPubKey: string;
    isscript: boolean;
    iswitness: boolean;
    witness_version?: number;
    witness_program?: string;
    balance: number;
    unspent_txouts: Array<{
      txid: string;
      vout: number;
      amount: number;
      height: number;
    }>;
  }> {
    const addressInfo = await this.validateAddress(address);
    if (!addressInfo.isvalid) {
      throw new Error("Invalid address");
    }

    // Get unspent outputs and total balance
    const scanResult = await this.scanTxOutset(address);

    return {
      ...addressInfo,
      balance: scanResult?.total_amount || 0,
      unspent_txouts: scanResult.unspents.map((utxo) => ({
        txid: utxo.txid,
        vout: utxo.vout,
        amount: utxo.amount,
        height: utxo.height,
      })) || [],
    };
  }

  async getAddressTransactions(
    txids: string[],
    page = 1,
    pageSize = 10
  ): Promise<{
    transactions: TransactionInfo[];
    total: number;
  }> {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageIds = txids.slice(start, end);
    const transactions: TransactionInfo[] = [];

    // Process transactions in smaller batches
    const batchSize = 5;
    for (let i = 0; i < pageIds.length; i += batchSize) {
      const batch = pageIds.slice(i, i + batchSize);
      try {
        const batchResults = await Promise.all(
          batch.map(async (txid) => {
            try {
              return await this.getRawTransaction(txid, 1);
            } catch (error) {
              console.error(`Failed to fetch transaction ${txid}:`, error);
              return null;
            }
          })
        );
        
        transactions.push(...batchResults.filter((tx): tx is TransactionInfo => tx !== null));

        if (i + batchSize < pageIds.length) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      } catch (error) {
        console.error(`Failed to process batch starting at index ${i}:`, error);
      }
    }

    return {
      transactions,
      total: txids.length,
    };
  }
}

export default BitcoinCLI;
