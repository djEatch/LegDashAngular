export class MasterLB {
  environmentType: string;
  address: string;
  endPoint: string;
  userName: string;
  passWord: string;

  constructor(et, a, ep, un, pw) {
    this.environmentType = et;
    this.address = a;
    this.endPoint = ep;
    this.userName = un;
    this.passWord = pw;
  }
  //MasterLBList.txt
}
