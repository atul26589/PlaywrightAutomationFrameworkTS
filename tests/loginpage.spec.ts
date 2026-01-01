
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import {test,expect} from '../fixtures/baseFixtures';



test('verify valid login',async({homePage})=>{
    await expect(homePage.page).toHaveTitle('My Account');
})



test('verify invalid login',async({page, baseURL})=>{
    let loginPage=new LoginPage(page);
    await loginPage.navigateToLoginPage(baseURL);
    await loginPage.doLogin('pwtest@nal.com','test123567');
    const errorMesg=await loginPage.getInvalidLoginMessage();
    expect(errorMesg).toContain('Warning: No match for E-Mail Address and/or Password.');
});
