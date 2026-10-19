class Sendmoney{
    constructor(page){
        this.page=page;
        this.sendmnybtn=page.getByRole('link',{name:'Send Money'}).first();
        this.from=page.getByRole('combobox',{name:'From Account'});
        this.drop=page.getByText('Everyday Checking');
        this.to=page.getByRole('combobox',{name:'Payee'});
        this.drop1=page.getByText('Rahul Sharma');
        this.amount=page.locator('#send-amount');
        this.review=page.getByRole('button',{name:'Review & Send'});
        this.confirm=page.getByRole('button',{name:'Confirm & Send'});
    }
    async goToSendMoney(){
        await this.sendmnybtn.click();
    }
    async sendMoney(Amount){
        await this.from.click();
        await this.drop.click();
        await this.to.click();
        await this.drop1.click();
        await this.amount.fill(Amount);
        await this.review.click();
        await this.confirm.click();
    }
}module.exports=Sendmoney;