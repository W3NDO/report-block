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
 * @returns returns an object as a string. {created: boolean, account: string|null, msg: string}
 */
export function accountOpened(
  accountID: string,
  uid: string,
  accountType: AccountType,
  creditor: string
): string {
  const tempAccount: CreditAccount = {
    uid,
    accountType,
    creditor,
  };
  if (!(storage.get<string>(accountID+"closed"))){ //check if acconut with the same ID was closed
    return `{ created: false, account: null, msg: "Account already exists" }`
  } else {
    storage.set<CreditAccount>(accountID, tempAccount);
    let created = storage.get<CreditAccount>(accountID);
    if (created){
      return `{ created: true, account: ${accountID}, msg: "Account opened successfully" }`
    } else {
      return `{ created: false, account: null, msg: "failed to create account for unkown reasons" }`
    }
  }
}

/**
 * closes an open account.
 * @param accountID - Identifier of the account you want to close
 * @param date  - epoch time date for the account closure. 
 * @returns returns an object as a string. {closed: boolean, account: string|null, msg: string}
 */
export function accountClosed(
  accountID: string,
  date: string,
): string {
  let exists = storage.get<CreditAccount>(accountID)
  if (exists){
    storage.set<string>(accountID+"closed", date);
    return `{ closed: true, account: ${accountID}, msg: "account closed successfully" }`;
  } else {
    return `{ closed: false, account: null, msg: "failed to close account. accountId not found" }`
  }

}


/**
 * Finds and returns a requested credit account by ID
 * @param accountID the record's unique id
 * @returns returns an object as a string. {found: boolean, account: object|null, msg: string}
 */
export function getCreditAccount(accountID: string): string | null {
  let account = storage.get<CreditAccount>(accountID);
  if (account){
    return `{found: true, account: ${accountID}, msg: "Found account"}`
  } else {
    return `{found: false, account: null, msg: "Account does not exist"}`
  }
}


/**
 * Notes on the Payment Received and Payment Missed Methods.
 * They will have the smae format for a key on storage, that is, (accountID-date), but the difference will be in the value
 * The value will be either "paid" or "missed"
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
  let exists = storage.get<CreditAccount>(accountID)
  if (exists){
    storage.set<string>(accountID +"-"+ date, "Paid");
    return `{paid: true, payment_key: ${accountID + "-"+ date}, msg: "Received payment recorded"}`;
  } else {
    return `{paid: false, payment_key: null, msg: "Account does not exist}`
  }
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
  let exists = storage.get<CreditAccount>(accountID)
  if (exists){
    storage.set<string>(accountID +"-"+ date, "Missed");
    return `{missed: true, payment_key: ${accountID + "-"+ date}, msg: "Missed payment recorded"}`;
  } else {
    return `{missed: false, payment_key: null, msg: "Account does not exist}`
  }
}

/**
 * Records disputes lodged
 * @param accountID - account in dispute
 * @param date - date the dispute was logged
 * @param dispute_uid - uid of the dispute
 * @param dispute_details - explains the details of the dispute
 * @returns object as string {recorded_dispute: boolean, dispute_key: string, dispute_details: string, msg: "Dispute recorded"}
 */
export function dispute(
  accountID: string,
  date: string,
  dispute_uid: string,
  dispute_details: string
) : string {
  let exists = storage.get<CreditAccount>(accountID)
  if (exists){
    storage.set<string>(accountID + "-"+ dispute_uid+"-"+date, dispute_details)
    return `{recorded_dispute: true, dispute_key: ${accountID + "-"+ dispute_uid+"-"+date}, dispute_details: ${date + ":" + dispute_details }, msg: "Dispute recorded"}`;
  } else {
    return `{recorded_dispute: false, dispute_key: null, dispute_details: null, msg: "Account does not exist"}`;
  }
}

/**
 * Updates the progress of currently occuring disputes
 * @param dispute_key - storage key of the dispute in question
 * @param date - date the update is made
 * @param dispute_details  - updated details of the dispute
 * @returns object as string {recorded_dispute: boolean, dispute_key: string, dispute_details: string, msg: "Dispute recorded"}
 */
export function disputeUpdate(
  dispute_key: string,
  date: string,
  dispute_details: string
) : string {
  let exists = storage.get<string>(dispute_key)
  if (exists){
    let new_dispute_key = dispute_key.split("-").slice(0,2).join("-")
    storage.set<string>(new_dispute_key+"-"+date, dispute_details)
    return `{recorded_dispute: true, dispute_key: ${new_dispute_key+"-"+date}, dispute_details: ${date + ":" + dispute_details }, msg: "Dispute recorded"}`;
  } else {
    return `{recorded_dispute: false, dispute_key: null, dispute_details: null, msg: "Account does not exist"}`;
  }
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
