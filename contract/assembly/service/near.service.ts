import { storage } from "near-sdk-as";
import { AccountType, CreditAccount } from "../model";
import { v4 as uuidv4 } from 'uuid';

export default class NearService {
  /**
   * Creates a record indicating the opening of an account
   * @param uid the user's unique identifier
   * @param accountType the type of account
   * @param creditor the creditor's name/ID
   */
  openCreditAccount(
    uid: string,
    accountType: AccountType,
    creditor: string
  ): void {
    const recordID = uuidv4();
    const tempAccount: CreditAccount = {
      uid,
      accountType,
      creditor,
    };
    storage.set<CreditAccount>(recordID, tempAccount);
  }

  /**
   * Finds and returns a requested credit account by ID
   * @param recordID the record's unique id
   * @returns requested credit account if found
   */
  getCreditAccount(
    recordID: string
  ): CreditAccount | null {
    return storage.get<CreditAccount>(recordID);
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
