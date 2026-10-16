import{test,expect} from '@playwright/test';
import { EnvManager } from '../src/utils/EnvManager';

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

test('OpenWeather current weather by city @positive', async ({ request }) => {
    const url = `${EnvManager.getApiBaseUrl()}/data/2.5/weather`;
    const apiKey = EnvManager.getApiKey();

    const response = await test.step('Request current weather for Hyderabad by city', async () => {
        return request.get(url, {
            params: {
                q: 'Hyderabad,IN',
                appid: apiKey
            }
        });
    });

    expect(response.status()).toBe(200);

    const responseBody = await test.step('Parse the current weather response', async () => {
        return response.json();
    });

    await test.step('Verify the weather response for Hyderabad', async () => {
        expect(responseBody.name).toBe('Hyderabad');
        expect(responseBody).toHaveProperty('main.temp');
        expect(responseBody).toHaveProperty('weather');
        expect(Array.isArray(responseBody.weather)).toBe(true);
    });
});

test('OpenWeather current weather by coordinates @positive', async ({ request }) => {
    const url = `${EnvManager.getApiBaseUrl()}/data/2.5/weather`;
    const apiKey = EnvManager.getApiKey();

    const response = await test.step('Request current weather by coordinates', async () => {
        return request.get(url, {
            params: {
                lat: '17.3850',
                lon: '78.4867',
                appid: apiKey
            }
        });
    });

    expect(response.status()).toBe(200);

    const responseBody = await test.step('Parse and verify the coordinate-based weather response', async () => {
        const body = await response.json();
        expect(body).toHaveProperty('main.temp');
        expect(body).toHaveProperty('coord.lat');
        expect(body).toHaveProperty('coord.lon');
        expect(Array.isArray(body.weather)).toBe(true);
        return body;
    });

    expect(responseBody.weather.length).toBeGreaterThan(0);
});

test('ReqRes creates a user @positive', async ({ request }) => {
    const response = await test.step('Create a user with the ReqRes API', async () => {
        return request.post('https://reqres.in/api/users', {
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            data: {
                name: 'Venkatesh',
                job: 'Automation specialist'
            }
        });
    });

    expect(response.status()).toBe(201);

    const responseBody = await test.step('Verify the created user response', async () => {
        return response.json();
    });

    expect(responseBody).toMatchObject({
        name: 'Venkatesh',
        job: 'Automation specialist'
    });
    expect(responseBody.id).toBeTruthy();
    expect(responseBody.createdAt).toBeTruthy();
});

test('ReqRes deletes a user @positive', async ({ request }) => {
    const response = await test.step('Delete user 2 with the ReqRes API', async () => {
        return request.delete('https://reqres.in/api/users/2', {
            headers: {
                'x-api-key': 'reqres-free-v1'
            }
        });
    });

    await test.step('Verify the user was deleted successfully', async () => {
        expect(response.status()).toBe(204);
        expect(response.ok()).toBeTruthy();
    });
});

test('ReqRes updates a user with PUT @positive', async ({ request }) => {
    const response = await test.step('Update user 2 with the ReqRes API', async () => {
        return request.put('https://reqres.in/api/users/2', {
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            data: {
                name: 'Venkatesh',
                job: 'Automation Engineer'
            }
        });
    });

    expect(response.status()).toBe(200);

    const responseBody = await test.step('Verify the updated user response', async () => {
        return response.json();
    });

    expect(responseBody).toMatchObject({
        name: 'Venkatesh',
        job: 'Automation Engineer'
    });
    expect(responseBody.updatedAt).toBeTruthy();
});

test('GET authenticated GitHub user with bearer token', async ({ request }) => {
    const token = EnvManager.get('API_BEARER_TOKEN');

    expect(token, 'API_BEARER_TOKEN must be set in env/.env.qa').toBeTruthy();

    const response = await test.step('Request the authenticated GitHub user', async () => {
        return request.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
    });

    expect(response.status()).toBe(200);

    const user = await response.json();
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('login');
});

test.only('Search Spotify with OAuth 2.0 client credentials', async ({ request }) => {
    const clientId = EnvManager.get('SPOTIFY_CLIENT_ID');
    const clientSecret = EnvManager.get('SPOTIFY_CLIENT_SECRET');

    expect(clientId, 'SPOTIFY_CLIENT_ID must be set').toBeTruthy();
    expect(clientSecret, 'SPOTIFY_CLIENT_SECRET must be set').toBeTruthy();

    const tokenResponse = await test.step('Request an OAuth access token', async () => {
        return request.post('https://accounts.spotify.com/api/token', {
            headers: {
                Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                grant_type: 'client_credentials'
            }
        });
    });

    expect(tokenResponse.status()).toBe(200);

    const tokenData = await tokenResponse.json();
    expect(tokenData.access_token).toBeTruthy();

    const apiResponse = await test.step('Search Spotify using the access token', async () => {
        return request.get('https://api.spotify.com/v1/search', {
            headers: {
                Authorization: `Bearer ${tokenData.access_token}`
            },
            params: {
                q: 'Queen',
                type: 'artist',
                limit: '5'
            }
        });
    });

    expect(apiResponse.status()).toBe(200);

    const searchData = await apiResponse.json();
    expect(searchData.artists.items.length).toBeGreaterThan(0);
});


