@nearBindgen
export class CreditAccount {
  uid: string;
  accountType: AccountType;
  creditor: string;
}

@nearBindgen
export class AccountType {
  static Student: number = 0
  static Auto: number = 1
  static Home: number = 2
}