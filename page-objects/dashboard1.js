class Dashboard1{
    constructor(page){
        this.page=page;
        this.transacbtn=page.getByRole('link',{name:'View all account activity'});
        this.transferbtn=page.getByText('Transfer Money',{exact:true});
    }
    async goToTransac(){
        await this.transacbtn.click();
    }
    async goToTransfer(){
        await this.transferbtn.click();
    }
}module.exports=Dashboard1;