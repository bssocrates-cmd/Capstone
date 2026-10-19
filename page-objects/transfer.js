class Transfer{
    constructor(page){
        this.page=page;
        this.transferbtn=page.getByRole('link',{name:'Transfer'}).first();
        this.drop=page.getByRole('combobox',{name:'From Account'});
        this.from=page.getByText('Everyday Checking');
        this.drop1=page.getByRole('combobox',{name:'To Account'});
        this.to=page.getByText('High-Yield Savings — ').nth(1);
        this.amount=page.locator('#transfer-amount');
        this.review=page.getByRole('button',{name:'Review Transfer'});
        this.confirm=page.getByRole('button',{name:'Confirm Transfer'});
    }
    async goToTransfer(){
       await this.transferbtn.click();
    }
    async transferToAcnt(Amount){
        await this.drop.click();
        await this.from.click();
        await this.drop1.click();
        await this.to.click();
        await this.amount.fill(Amount);
        await this.review.click();
        await this.confirm.click();
    }
}module.exports=Transfer;