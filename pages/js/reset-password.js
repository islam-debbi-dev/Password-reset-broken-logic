document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('form').addEventListener('submit', async function (e) {
        e.preventDefault();
        await resetPassword();
    });
});

async function resetPassword() {
    const email = document.getElementById('email').value;
    try {
        const response = await fetch('/password/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            alert('Reset link sent to your email');
        } else {
            alert('Error sending reset link');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}
