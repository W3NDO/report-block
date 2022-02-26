import { Context, logging, storage } from "near-sdk-as";
import { Account, Response, Payment } from "./model";

// TODO: Calling account id can be retrieved from `Context.sender`
// TODO: Use logging.log to record logs permanently to the blockchain!

// Account Event Codes
const ACCOUNT_CLOSED = "closed";
const ACCOUNT_PAYMENT_RECEIVED = "payment-received";
const ACCOUNT_PAYMENT_MISSED = "payment-missed";

// Empty map for responses
const EMPTY_MAP = new Map<string, string>();

function getAccount<Account>(accountId: string): Account | null {
  return storage.get<Account>(accountId);
}

function checkIfAccountExists(accountId: string): bool {
  return storage.contains(accountId);
}

/**
 * Creates a record indicating the opening of an account
 * @param accountId the account identifier
 * @param uid the user's unique identifier
 * @param accountType the type of account
 * @param creditor the creditor's name/ID
 */
export function accountOpened(
  accountId: string,
  uid: string,
  lenderId: string,
  type: string,
  info: Map<string, string>,
  payments: Payment[],
  dateOpened: string, //find a way to get dates from the contract data
  remarks: string
): Response {
  const exists = checkIfAccountExists(accountId);
  if (exists) {
    return {
      success: false,
      data: EMPTY_MAP,
      message: "Account already exists",
    };
  }

  const tempAccount: Account = {
    accountId,
    uid,
    lenderId,
    type,
    info,
    payments,
    dateOpened, //find a way to get dates from the contract data
    remarks
  };

  storage.set<Account>(accountId, tempAccount);
  const created = checkIfAccountExists(accountId);
  if (!created) {
    return {
      success: false,
      data: EMPTY_MAP,
      message: "Failed to create account for unkown reasons",
    };
  }

  const data = new Map<string, string>();
  data.set("id", accountId);
  return {
    success: true,
    data,
    message: "Account opened successfully",
  };
}

/**
 * closes an open account.
 * @param accountId - Identifier of the account you want to close
 * @param date  - epoch time date for the account closure.
 */
export function accountClosed(accountId: string, date: string): Response {
  const closureKey = `${accountId}:${ACCOUNT_CLOSED}`;
  const exists = checkIfAccountExists(accountId);
  const closed = checkIfAccountExists(closureKey);
  if (!exists || closed) {
    return {
      success: false,
      data: EMPTY_MAP,
      message: closed ? "Account already closed" : "Account not found",
    };
  }

  storage.set<string>(closureKey, date);

  const data = new Map<string, string>();
  data.set("id", closureKey);
  return {
    success: true,
    data,
    message: "Account closed successfully",
  };
}

/**
 * Finds and returns a requested credit account by ID
 * @param accountId the record's unique id
 */
export function viewAccount(accountId: string): Response {
  const account = getAccount<Account>(accountId);
  if (!account) {
    return {
      success: false,
      data: EMPTY_MAP,
      message: "Account does not exist",
    };
  }

  const data = new Map<string, string>();
  data.set("id", accountId);
  data.set("uid", account.uid);
  data.set("accountType", account.type);
  data.set("lender", account.lenderId);
  return { success: true, data, message: "Found account" };
}

/**
 * Records when a payment was received and returns a stringified object "{accountId-date: "Paid"}"
 * @param accountId uniqueID
 * @param date - a string in epoch time.
 */
export function paymentReceived(accountId: string, date: string): Response {
  const exists = checkIfAccountExists(accountId);
  if (!exists) {
    return {
      success: false,
      data: EMPTY_MAP,
      message: "Account does not exist",
    };
  }

  const paymentKey = `${accountId}:${ACCOUNT_PAYMENT_RECEIVED}:${date}`;
  storage.set<string>(paymentKey, date);

  const data = new Map<string, string>();
  data.set("paymentKey", paymentKey);
  return {
    success: true,
    data,
    message: "Received payment recorded",
  };
}

/**
 * Records when a payment was missed and returns a stringified object "{accountId-date: "Missed"}"
 * @param accountId uniqueID
 * @param date - a string in epoch time.
 */
export function paymentMissed(accountId: string, date: string): Response {
  const exists = checkIfAccountExists(accountId);
  if (!exists) {
    return {
      success: false,
      data: EMPTY_MAP,
      message: "Account does not exist",
    };
  }

  const paymentKey = `${accountId}:${ACCOUNT_PAYMENT_MISSED}:${date}`;
  storage.set<string>(paymentKey, date);

  const data = new Map<string, string>();
  data.set("paymentKey", paymentKey);
  return {
    success: true,
    data,
    message: "Missed payment recorded",
  };
}

/**
 * Records disputes lodged
 * @param accountId - account in dispute
 * @param date - date the dispute was logged
 * @param disputeUid - uid of the dispute
 * @param disputeDetails - explains the details of the dispute
 */
export function disputeOpened(
  accountId: string,
  date: string,
  disputeUid: string,
  disputeDetails: string
): Response {
  const exists = checkIfAccountExists(accountId);
  if (!exists) {
    return {
      success: false,
      data: EMPTY_MAP,
      message: "Account does not exist",
    };
  }

  const disputeKey = `${accountId}:${disputeUid}:${date}`;
  storage.set<string>(disputeKey, disputeDetails);

  const data = new Map<string, string>();
  data.set("disputeKey", disputeKey);
  data.set("disputeDetails", disputeDetails);
  data.set("date", date);
  return {
    success: true,
    data,
    message: "Dispute recorded",
  };
}

/**
 * Updates the progress of currently occuring disputes
 * @param disputeKey - storage key of the dispute in question
 * @param date - date the update is made
 * @param disputeDetails  - updated details of the dispute
 */
export function disputeUpdate(
  disputeKey: string,
  date: string,
  disputeDetails: string
): Response {
  const exists = checkIfAccountExists(disputeKey);
  if (!exists) {
    return {
      success: false,
      data: EMPTY_MAP,
      message: "Account does not exist",
    };
  }

  const disputePrefix = disputeKey.split(":").slice(0, 2).join(":");
  const newDisputeKey = `${disputePrefix}:${date}`;
  storage.set<string>(newDisputeKey, disputeDetails);

  const data = new Map<string, string>();
  data.set("disputeKey", newDisputeKey);
  data.set("disputeDetails", disputeDetails);
  data.set("date", date);
  return {
    success: true,
    data,
    message: "Dispute recorded",
  };
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
