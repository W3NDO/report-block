/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/develop/contracts/as/intro
 *
 */

import { Context, logging, storage } from 'near-sdk-as'

const DEFAULT_MESSAGE = 'Hello Report Block'
// get a global variable to keep track of accountID
var creditAccountIDCounter : number = 1;

// Exported functions will be part of the public interface for your smart contract.
// Feel free to extract behavior to non-exported functions!
export function getGreeting(accountId: string): string | null {
  // This uses raw `storage.get`, a low-level way to interact with on-chain
  // storage for simple contracts.
  // If you have something more complex, check out persistent collections:
  // https://docs.near.org/docs/concepts/data-storage#assemblyscript-collection-types
  return storage.get<string>(accountId, DEFAULT_MESSAGE)
}

export function setGreeting(message: string): void {
  const accountId = Context.sender
  // Use logging.log to record logs permanently to the blockchain!
  logging.log(`Saving greeting "${message}" for account "${accountId}"`)
  storage.set(accountId, message)
}

enum AccountType { //different accounts available. 
  Student,
  Auto,
  Home,
};
type MyAccount = AccountType

interface CreditAccount {
  uid: string;
  accountType: MyAccount;
  creditor: string;
 };

/**
 * Key Variables for an open account
 * UID => alphanumeric
 * type => enumerable (student, auto, home, card, collections, other)
 * creditor => string
 */
export function openCreditAccount(_uid : string, _accountType : AccountType, _creditor : string ) : void{
  var tempAccount : CreditAccount = {
    uid: _uid,
    accountType: _accountType,
    creditor: _creditor,
  }
  storage.set<CreditAccount>( creditAccountIDCounter.toString(), tempAccount); //store
  creditAccountIDCounter +=1;
}

export function getCreditAccount(creditAccountID : string) : CreditAccount | null{
  return storage.get<CreditAccount>(creditAccountID)
}

// Add our functions here
/**
 * ================ Setters ====================
 * open-credit-account()
 * payment-received()
 * payment-missed()
 * account-closure()
 * dispute()
 * dispute_update()
 * ================ Getters ====================
 * get_file()
 * get_score()
 */


