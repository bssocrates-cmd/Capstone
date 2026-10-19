class Accounts{
    constructor(page){
        this.page=page;
        this.accntsbtn=page.getByRole('link',{name:'Accounts'}).first();
        this.viewbtn=page.getByRole('button',{name:'View'}).first();
        this.addacnt=page.getByRole('button',{name:'Add Account'});
        this.accntname=page.getByRole('textbox',{name:'Account Name'});
        this.drop=page.getByRole('combobox',{name:'Account Type'});
        this.type=page.getByRole('option',{name:'Savings'});
        this.balance=page.getByPlaceholder('0.00');
        this.accept=page.getByLabel('I accept the terms and conditions').first();
        this.add=page.getByRole('button',{name:'Add Account'});
    }
    async goToAccounts(){
        await this.accntsbtn.click();
    }
    async displayDetails(){
       await this.viewbtn.click();

    }
    async addAccount(name,amount){
        await this.addacnt.click();
        await this.accntname.fill(name);
        await this.drop.click();
        await this.type.click();
        await this.balance.fill(amount);
        await this.accept.check();
        await this.add.click();
    }
}module.exports=Accounts;