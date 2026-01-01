import { Locator,Page } from '@playwright/test';
import { ElementUtil } from '../utils/ElementUtil';
import { HomePage } from './HomePage';


export class LoginPage {

    //page locators
     private readonly page: Page;
    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
    private readonly warningMsg: Locator;
    private readonly eleUtil: ElementUtil;

    //page class constructor..
    constructor(page: Page) {
        this.page = page;
        this.emailId = page.getByRole('textbox', { name: 'E-mail Address' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.locator(`input[value='Login']`);
        this.warningMsg = page.locator('.alert.alert-danger.alert-dismissible');
        this.eleUtil = new ElementUtil(page);
    }
    //page actions/methods:
    async navigateToLoginPage(baseURL: string | undefined) {
        await this.page.goto(baseURL+'?route=account/login');
        
    }
    /**
     *  login using username/password
     * @param email 
     * @param pwd 
     * @returns 
     */


    async doLogin(email: string, pwd: string) {
       await this.eleUtil.fill(this.emailId, email);
         await this.eleUtil.fill(this.password, pwd);
        await this.eleUtil.click(this.loginButton,{force:true,timeout:5000});
        const pagetitle=await this.page.title();
       // console.log(`Home Page title after login: ${pagetitle}`);
        return new HomePage(this.page);
        
    }

    /**
     * get the error message in case of  invalid login
     * @returns 
     */
    async getInvalidLoginMessage(): Promise<string|null> {
        const errorMesg=await this.eleUtil.getText(this.warningMsg);
        console.log(`Error message displayed on invalid login: ${errorMesg}`);
        return errorMesg;
    }

    async navigateToRegisterPage():Promise<RegisterPage>{
await this.eleUtil.click(this.registerLink,{force:true},1);
return new RegisterPage(this.page);


}
}

