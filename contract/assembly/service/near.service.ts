import { storage } from "near-sdk-as";
import { AccountType, CreditAccount } from "../model";

export default class NearService {


  /**
   * Creates a record indicating the opening of an account
   * @param accountID the account identifier
   * @param uid the user's unique identifier
   * @param accountType the type of account
   * @param creditor the creditor's name/ID
   */
  openCreditAccount(
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
  getCreditAccount(
    accountID: string
  ): CreditAccount | null {
    return storage.get<CreditAccount>(accountID);
  }

  /**
   * Records a received payment towards a specific credit account. Date is recorded in epochtime as a string.
   * @param accountID uniqueID
   * @param date - a string in epoch time.
   * @returns an object {accountID-date: "Paid"}
   */
  paymentReceived(
    accountID: string,
    date: string  //typically in epoch-time
  ): string {
    storage.set<string>(accountID+date, "Paid")    
    return  `{${accountID+"-"+date}: "Paid" }`
  }

  /**
   * Records a missed payment towards a specific credit account. Date is recorded in epochtime as a string.
   * @param accountID uniqueID
   * @param date - a string in epoch time.
   * @returns a stringified object {accountID-date: "Missed"}
   */
  paymentMissed(
    accountID: string,
    date: string //typically in epoch time
  ): string {
    storage.set<string>(accountID+date, "Missed")
    return  `{${accountID+":"+date}: "Paid" }`
  }

  /**
   * Records a closure of a credit account. Date is recorded in epochtime as a string.
   * @param accountID 
   * @param date 
   * @returns 
   */
  closeAccount(
    accountID: string,
    date: string
  ): string{
    storage.set<string>(accountID+date, "Account closed")
    return `Closed account ${accountID}`
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
