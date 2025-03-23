import { url } from "../../helpers/constants";

async function login() {
    try {
        const result = await fetch(`http://localhost:3000/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            })
        });

        if (!result.ok) {
            throw new Error('Login failed');
        }

        const data = await result.json();
        window.location.href = '/page/my-account'; // Redirect to my account page
    } catch (error) {
        console.error('Error:', error);
        alert('Login failed. Please check your credentials and try again.');
    }
}