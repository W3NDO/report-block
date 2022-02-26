@nearBindgen
export class Account {
  accountId: string;
  uid: string;
  lenderId: string;
  type: string; //"card"|"loan"
  info: Map<string, string>;
  payments: Payment[];
  dateOpened: string;
  remarks: string;
  isOpen: boolean;
}

@nearBindgen
export class Lender{
  info: Map<string, string>;
  consumers: string[];
  history: Event[]
}

@nearBindgen
export class Consumer{
  info: Map<string, string>;
  account: Map<string, Account>;
  disputes: Map<string, Dispute>;
}
@nearBindgen
export class Dispute{
  date: string;
  field: string;
  info: Map<string, string>;
  accountId: string;
  lenderId: string;
  remarks: string;
  isOpen: boolean;
}

@nearBindgen
export class PaymentReport{
  consumerId: string;
  accountId: string;
  payment: Payment;
}

@nearBindgen
export class Response{
  success: boolean;
  data: Map<string, string>;
  message: string;
}

@nearBindgen
export class Payment{
  date: string;
  amount: number;
  missed: boolean;
}

@nearBindgen
export class Event{
  date: string;
  eventType: string;
  caller: string;
}