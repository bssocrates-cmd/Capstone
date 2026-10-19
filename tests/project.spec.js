const Login1 = require("../page-objects/login1");
const{test,expect}=require("@playwright/test");
import Accounts from '../page-objects/accounts';
import Dashboard1 from '../page-objects/dashboard1';
import Sendmoney from '../page-objects/sendmoney';
import Transfer from '../page-objects/transfer';
import userData from '../test-data/users1.json';


test('Valid login test',async({page})=>{
    const login1=new Login1(page);
    await login1.goTo();
    await expect(page).toHaveURL('/bank/login');
    await login1.validLogin(userData.validUser.username,userData.validUser.password);
    await expect(page).toHaveURL('/bank/dashboard');
})

test('Invalid login test',async({page})=>{
    const login1=new Login1(page);
    await login1.goTo();
    await expect(page).toHaveURL('/bank/login');
    await login1.invalidLogin(userData.invalidUser.username,userData.invalidUser.password);
    const failmsg=page.getByText('The username or password you entered is incorrect.');
    await expect(failmsg).toBeVisible();

})

test.describe('Bank app',()=>{
    test.beforeEach(async({page})=>{
    const login1=new Login1(page);
    await login1.goTo();
    await page.waitForURL('/bank');
    await login1.validLogin(userData.validUser.username,userData.validUser.password);
    await expect(page).toHaveURL('/bank/dashboard');
    });

    test('Recent transaction link',async({page})=>{
        const dashboard1=new Dashboard1(page);
        await dashboard1.goToTransac();
        await expect(page).toHaveURL('/bank/transactions');
        const transacRows=page.getByTestId('all-txn-row');
        const fifthTransac=transacRows.nth(4);
        await expect(fifthTransac).toBeVisible();
    });

    test('Quick transfer link',async({page})=>{
        const dashboard1=new Dashboard1(page);
        await dashboard1.goToTransfer();
        await expect(page).toHaveURL('/bank/transfer');
    });

    test('Accounts list',async({page})=>{
        const accounts=new Accounts(page);
        await accounts.goToAccounts();
        await expect(page.getByText('Everyday Checking').first()).toBeVisible();
        await expect(page.getByText('High-Yield Savings').first()).toBeVisible();
    });

    test('Account details display',async({page})=>{
        const accounts=new Accounts(page);
        await accounts.goToAccounts();
        await accounts.displayDetails();
        await expect(page.getByText('Everyday Checking')).toBeVisible();
        await expect(page.getByText('****4321')).toBeVisible();
    });

    test('Adding account',async({page})=>{
        const accounts=new Accounts(page);
        await accounts.goToAccounts();
        await accounts.addAccount(userData.newAccount.name,userData.newAccount.amount);
        await expect(page.getByText('personal')).toBeVisible();
    });

    test('Insufficient funds validation',async ({page})=>{
        const transfer=new Transfer(page);
        await transfer.goToTransfer();
        await transfer.transferToAcnt('5000');
        await expect(page.getByText('Insufficient funds.')).toBeVisible();
    });

    test('Succesful internal transfer',async({page})=>{
        const transfer=new Transfer(page);
        await transfer.goToTransfer();
        await transfer.transferToAcnt('100');
        await expect(page.getByText('Transfer Successful')).toBeVisible();
    });

    test('Verify insufficient funds',async({page})=>{
        const sendmoney=new Sendmoney(page);
        await sendmoney.goToSendMoney();
        await sendmoney.sendMoney('5000');
        await expect(page.getByText('Insufficient funds.')).toBeVisible();
    });

    test('Verify succesful send money',async({page})=>{
        const sendmoney=new Sendmoney(page);
        await sendmoney.goToSendMoney();
        await sendmoney.sendMoney('100');
        await expect(page.getByText('Money Sent Successfully')).toBeVisible();
    });

    test('Frozen login alert',async({page})=>{
        const login1=new Login1(page);
        login1.logoutApp();
        await expect(page).toHaveURL('/bank/login');
        login1.frozenLogin(userData.frozenUser.username,userData.frozenUser.password);
        await expect(page.getByText('Account Frozen:')).toBeVisible();
    });

})

