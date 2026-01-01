import { Locator,Page } from "@playwright/test";
import { ElementUtil } from "../utils/ElementUtil";
import { LoginPage } from "./LoginPage";


export class HomePage {

    //page locators/objects/OR:
     readonly page: Page;
    private readonly eleUtil: ElementUtil;
    private readonly loginLink: Locator;
    private readonly logoutLink: Locator;
    private readonly searchBox: Locator;
    private readonly searchIcon: Locator;

    //page class constructor..
    constructor(page: Page) {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.loginLink = page.getByRole('link', { name: 'Login' });
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.searchBox = page.locator('input[name="search"]');
        this.searchIcon = page.locator('button[class="btn btn-default btn-lg"]');
    }

    //page actions/methods:
    async isUserLoggedIn(){
        return await this.eleUtil.isVisible(this.logoutLink);
    }
    async logout():Promise<LoginPage>{
        await this.eleUtil.click(this.logoutLink,{ timeout:5000},1 );
        await this.eleUtil.click(this.loginLink,{ timeout:5000},1 );
     return new LoginPage(this.page);
    }


    async doSearch(searchKey:string){
        await this.eleUtil.type(this.searchBox,searchKey);
        await this.eleUtil.click(this.searchIcon);
    }
}