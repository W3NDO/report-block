@nearBindgen
export class CreditAccount {
  uid: string;
  accountType: AccountType;
  creditor: string;
}

@nearBindgen
export class AccountType {
  static Student: string = "0"
  static Auto: string = "1"
  static Home: string = "2"
}