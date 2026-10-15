import{test,expect} from '@playwright/test';

test('API test', async({request})=>{

    await request.get('https://jsonplaceholder.typicode.com/posts/1').then(async(response)=>{
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(data).toHaveProperty('id', 1);
        expect(data).toHaveProperty('title');
        expect(data).toHaveProperty('body');
    });
    
})

test('API test 2  @positive', async({request})=>{
    const response=await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.ok()).toBeTruthy();
    
    //interpolating the response status code into the assertion message for better debugging
    console.log(`Response Status: ${response.status()}`);

    expect(response.status()).toBe(200);

    // Parsing the response body as JSON or deserializing it into a JavaScript object
    const responseBody=await response.json();

    console.log('Response Body:', responseBody);

    expect(responseBody.title).toBe(
  'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'
    ); 
    expect(responseBody).toHaveProperty('id', 1);
    expect(responseBody).toHaveProperty('title');
    expect(responseBody).toHaveProperty('body');
})

test('API test 3 @positive', async({request})=>{

    const apikey='0f3d7418ed2b01a7779ebbe2e6194129'

    const appURL=`https://api.openweathermap.org/data/2.5/weather?q=Hyderabad,IN&appid=${apikey}`;

    const response = await test.step('Request current weather for Hyderabad', async () => {
        return await request.get(appURL);
    });

    await test.step('Verify the weather API response status', async () => {
        expect(response.ok()).toBeTruthy();
        console.log(`Response Status: ${response.status()}`);
    });

    const responseBody = await test.step('Parse the weather API response body', async () => {
        const body = await response.json();
        console.log('Response Body:', body);
        console.log(JSON.stringify(body, null, 2));
        return body;
    });

    await test.step('Verify the response is for Hyderabad', async () => {
        expect(responseBody).toHaveProperty('name', 'Hyderabad');
        expect(responseBody.name).toBe('Hyderabad');
    });
})