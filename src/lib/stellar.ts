import StellarSdk, {TransactionBuilder, Networks, StrKey, Asset } from 'stellar-sdk'
import toast from 'react-hot-toast'

const horizonUrl = 'https://horizon-testnet.stellar.org'
const server = new StellarSdk.Horizon.Server(horizonUrl)

/**
 A collection of function that helps query various information
 * from the [Horizon API](https://developers.stellar.org/api/horizon). This
 * allows us to abstract and simplify some interactions so we don't have to have
 * _everything_ contained within our `*.svelte` files.
 */

// We'll import some type definitions that already exists within the
// `stellar-sdk` package, so our functions will know what to expect.
/**
 * Fetches and returns details about an account on the Stellar network.
 
 */
export async function fetchAccount(publicKey:string) {
    if (StrKey.isValidEd25519PublicKey(publicKey)) {
        try {
            let account = await server.accounts().accountId(publicKey).call()
            return account
        } catch (err:any) {
            // @ts-ignore
            if (err.response?.status === 404) {
                toast.error('account not funded on network')
            } else {
                // @ts-ignore
                throw error(err.response?.status ?? 400, {
                    // @ts-ignore
                    message: `${err.response?.title} - ${err.response?.detail}`,
                })
            }
        }
    } else {
        throw new Error("error getting message")
    }
}

/**
 * Fetches and returns balance details for an account on the Stellar network.
 * @async
 * @function fetchAccountBalances
 * @param {string} publicKey Public Stellar address holding balances to query
 * @returns {Promise<BalanceLine[]>} Array containing balance information for each asset the account holds
 */
export async function fetchAccountBalances(publicKey:string) {
    const { balances } = await fetchAccount(publicKey)
    return balances
}

/**
 * Fetches and returns recent `payment`, `createAccount` operations that had an effect on this account.
 * @async
 * @function fetchRecentPayments
 * @param {string} publicKey Public Stellar address to query recent payment operations to/from
 * @param {number} [limit] Number of operations to request from the server
 * @returns {Promise<PaymentOperationRecord[]>} Array containing details for each recent payment
 */
export async function fetchRecentPayments(publicKey:string, limit = 10) {
    const { records } = await server
        .payments()
        .forAccount(publicKey)
        .limit(limit)
        .order('desc')
        .call()
    return records
}

/**
 * Fund an account using the Friendbot utility on the Testnet.
 * @async
 * @function fundWithFriendbot
 * @param {string} publicKey Public Stellar address which should be funded using the Testnet Friendbot
 */
export async function fundWithFriendbot(publicKey:string) {
    console.log(`i am requesting a friendbot funding for ${publicKey}`)
    await server.friendbot(publicKey).call()
}

/**
 * Begin a transaction with typical settings
 * @async
 * @function startTransaction
 * @param {string} sourcePublicKey Public Stellar address which will be the source account for the created transaction
 * @returns {Promise<TransactionBuilder>}
 */
export async function startTransaction(sourcePublicKey:string) {
    let source = await server.loadAccount(sourcePublicKey)
    const transaction = new TransactionBuilder(source, {
        networkPassphrase: Networks.TESTNET,
        fee: '100000',
    })

    return transaction
}

/**
 * Submits a Stellar transaction to the network for inclusion in the ledger.
 * @async
 * @function submit
 * @param {Transaction} transaction Built transaction to submit to the network
 * @throws Will throw an error if the transaction is not submitted successfully.
 */
export async function submit(transaction:any) {
    try {
        await server.submitTransaction(transaction)
    } catch (err) {
        throw new Error("error submitting transaction")
    }
}

