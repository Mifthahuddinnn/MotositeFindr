import Swal from 'sweetalert2';
import MotorSource from '../../data/motor-source';

const Login = {
    async render() {
        return `
    <section class="login">
        <div class="container">
            <div class="row">
                <div class="col col-sm-6 text-center">
                    <img
                        src="./images/img/login.png" class="img-login card-img-top" data-aos="fade-right" alt="..."/>
                    </div>

                    <div class="heading-login col col-sm-6">
                    <h2>Login to your Account</h2>
                    <p>See what is going on with your business</p>

                    <div class="form-login mb-3">
                        <label for="email" class="form-label">email</label>
                        <input type="email" class="form-control" id="email" name="email" placeholder="Enter your username"/>

                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" name="password" placeholder="Enter your password"/>
                    </div>

                    <div class="forgot mb-4 text-center">
                        <a href="#">Forgot Password?</a>
                    </div>

                    <div class="d-grid gap-2">
                        <button id="loginButton" class="btn-login btn" type="button">Login</button>
                    </div>

                    <div class="register-create">
                        <span
                        >Not Registered Yet? <a href="#/register">Create an account</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;
    },
    async afterRender() {
        document.getElementById('loginButton').addEventListener('click', async () => {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            if (!email || !password) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please fill in all the form fields!',
                    color: '#00214D',
                    confirmButtonColor: '#00EBC7',
                });
                return;
            }

            const data = {
                email,
                password,
            };

            // Show loading state
            const loginButton = document.getElementById('loginButton');
            loginButton.textContent = 'Logging in...';
            loginButton.disabled = true;

            MotorSource.login(data);
        });
    },
};

export default Login;
