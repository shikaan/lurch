(function ($scope = {}) {

    // const BASE_URL = 'http://192.168.99.100:30000'
    const BASE_URL = 'http://localhost:3000'

    $scope.register = async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value
        const password = document.getElementById('password').value

        try {
            await fetch(`${BASE_URL}/api/users/registration`, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ username, password })
            })
        } catch (e) {
            console.error(e)
        }
    }

    (function _init() {
        document.getElementById('register-form').addEventListener('submit', register);
    })();

})(window);