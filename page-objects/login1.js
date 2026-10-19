class Login1{
    constructor(page){
        this.page=page;
        this.bankapp=page.getByText('Bank App');
        this.practice=page.getByRole('link',{name:'Practice',exact:true});
        this.username=page.getByPlaceholder('Enter username');
        this.password=page.getByPlaceholder('Enter password');
        this.signin=page.getByRole('button',{name:'Sign In'});
        this.logout=page.getByRole('button',{name:'Logout'});
    }
    async goTo(){
        await this.page.goto('/');
        await this.practice.click();
        await this.bankapp.click();
    }
    async validLogin(userName,passWord){
        await this.username.fill(userName);
        await this.password.fill(passWord);
        await this.signin.click();
    }
    async invalidLogin(Username,Password){
        await this.username.fill(Username);
        await this.password.fill(Password);
        await this.signin.click();
    }
    async logoutApp(){
        await this.logout.click();
    }
    async frozenLogin(uname,pword){
        await this.username.fill(uname);
        await this.password.fill(pword);
        await this.signin.click();
    }
}
module.exports=Login1;