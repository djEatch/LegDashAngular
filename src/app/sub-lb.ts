export class SubLB {

    name: string;
    primaryipaddress: string;
    primaryport: string;
    state: string;

    splitEnvName: string;
    splitLeg: string;
    splitServerType: string;

    constructor(name, ip, port, state) {
      this.name = name;
      this.primaryipaddress = ip;
      this.primaryport = port;
      this.state = state;
      
      this.splitEnvName= this.name.split('-')[0]
      this.splitLeg=this.name.split('-')[1]
      this.splitServerType= this.name.split('-')[2]

    }

}
