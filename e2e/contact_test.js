// Feature ('contact');

// Scenario('contact', async ({ I }) => {

//     const subject = 'Testing using CodeceptJS';
//     const name = 'CodeceptJS';
//     const email = 'CodeceptJS@gmail.com'
//     const phone = '08123456789';
//     const yourmessage = 'Hola, using CodeceptJS';

//     I.amOnPage('/');
//     I.click('#navbarNav > ul > li:nth-child(3) > a');
//     I.wait(2);
//     I.fillField('#subject', subject);
//     I.fillField('#name', name);
//     I.fillField('#email', email);
//     I.fillField('#phone', phone);
//     I.fillField('textarea, #yourmessage', yourmessage);
//     I.wait(2);
//     I.click('#mainContent > section > div > div > div:nth-child(2) > form > div.d-grid.gap-2 > button');
//     I.wait(2);
//     I.click('body > div > div > div.swal2-actions > button.swal2-confirm.swal2-styled.swal2-default-outline')
//     I.wait(2);
// });