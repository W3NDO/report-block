import { Context, logging, storage } from "near-sdk-as";
import { AccountType, CreditAccount, Response, ResponseData } from "./model";

// TODO: Calling account id can be retrieved from `Context.sender`
// TODO: Use logging.log to record logs permanently to the blockchain!

/**
 * Creates a record indicating the opening of an account
 * @param accountID the account identifier
 * @param uid the user's unique identifier
 * @param accountType the type of account
 * @param creditor the creditor's name/ID
 */
export function openCreditAccount(
  accountID: string,
  uid: string,
  accountType: AccountType,
  creditor: string
): void {
  const tempAccount: CreditAccount = {
    uid,
    accountType,
    creditor,
  };
  storage.set<CreditAccount>(accountID, tempAccount);
}

/**
 * Finds and returns a requested credit account by ID
 * @param accountID the record's unique id
 * @returns requested credit account if found
 */
export function getCreditAccount(accountID: string): CreditAccount | null {
  return storage.get<CreditAccount>(accountID);
}

/**
 * Records when a payment was received and returns a stringified object "{accountID-date: "Paid"}"
 * @param accountID uniqueID
 * @param date - a string in epoch time.
 * @returns an object {accountID-date: "Paid"}
 */
export function paymentReceived(
  accountID: string,
  date: string //typically in epoch-time
): string {
  storage.set<string>(accountID + date, "Paid");
  return `{${accountID + "-" + date}: "Paid" }`;
}

/**
 * Records when a payment was missed and returns a stringified object "{accountID-date: "Missed"}"
 * @param accountID uniqueID
 * @param date - a string in epoch time.
 * @returns a stringified object {accountID-date: "Missed"}
 */
export function paymentMissed(
  accountID: string,
  date: string //typically in epoch time
): string {
  storage.set<string>(accountID + date, "Missed");
  return `{${accountID + ":" + date}: "Paid" }`;
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

/**
 * Response Object required. 
 */
