$(document).ready(function () {
    let sign = `
      <div class="login-container">
          <h2>HelpDesk</h2>
          <div class="toggle-buttons">
              <button class="login-btn active" onclick="toggleForm('login')">Entrar</button>
              <button class="register-btn" onclick="toggleForm('register')">Cadastrar</button>
          </div>
          <form id="loginForm" class="login-form">
              <div class="form-group">
                  <input type="text" id="userLogin" required placeholder=" " autocomplete="username">
                  <label for="userLogin">E-mail ou Nome de Usuário</label>
              </div>
              <div class="form-group">
                  <input type="password" id="passwordLogin" required placeholder=" " minlength="6" autocomplete="current-password">
                  <label for="passwordLogin">Senha</label>
              </div>
              <input type="submit" value="Entrar">

              <div class="toggle-buttons">
                  <button type="button" class="forgot-btn" onclick="toggleForm('forgot')">Esqueceu a Senha?</button>
              </div>
          </form>
          <form id="registerForm" class="register-form">
              <div class="form-group">
                  <input type="text" id="nicknameRegister" required placeholder=" ">
                  <label for="nicknameRegister">Nome Completo</label>
              </div>
              <div class="form-group">
                  <input type="text" id="usernameRegister" required placeholder=" " autocomplete="username"> 
                  <label for="usernameRegister">Nome de Usuário</label>
              </div>
              <div class="form-group">
                  <input type="email" id="emailRegister" required placeholder=" ">
                  <label for="emailRegister">E-mail</label>
              </div>
              <div class="form-group">
                  <input type="password" id="passwordRegister" required placeholder=" " minlength="6" autocomplete="new-password">
                  <label for="passwordRegister">Senha</label>
              </div>
              <div class="form-group">
                  <input type="password" id="confirmPasswordRegister" required placeholder=" " minlength="6" autocomplete="new-password">
                  <label for="confirmPasswordRegister">Confirmar Senha</label>
              </div>
              <div class="form-group-checkbox">
                  <input type="checkbox" id="acceptTerms" required>
                  <label for="acceptTerms">Eu concordo com os <a href="#">Termos e Condições</a></label>
              </div>
              <input type="submit" value="Cadastrar">
          </form>
          
          <form id="forgotForm" class="forgot-form">
              <div class="form-group">
                  <input type="email" id="emailForgot" required placeholder=" ">
                  <label for="emailForgot">E-mail</label>
              </div>
              <input type="submit" value="Recuperar">
          </form>

          <form id="activeForm" class="forgot-form">
              <div class="form-group">
                  <input type="email" id="emailActive" required placeholder=" ">
                  <label for="emailActive">E-mail</label>
              </div>
              <input type="submit" value="Ativar">
          </form>

          <form id="forgotForm2" class="forgot-form2">
              <div class="form-group">
                  <input type="email" id="emailForgot2" required placeholder=" " autocomplete="email">
                  <label for="emailForgot2">E-mail</label>
              </div>
              <div class="form-group">
                  <input type="password" id="passwordForgot2" required placeholder=" " minlength="6" autocomplete="new-password">
                  <label for="passwordForgot2">Nova Senha</label>
              </div>
              <div class="form-group">
                  <input type="password" id="confirmPasswordForgot2" required placeholder=" " minlength="6" autocomplete="new-password">
                  <label for="confirmPasswordForgot2">Confirmar Nova Senha</label>
              </div>
              <div class="form-group">
                  <input type="text" id="codeForgot2" required placeholder=" ">
                  <label for="codeForgot2">Código</label>
              </div>
              <input type="submit" value="Alterar Senha">
          </form>
      </div>
      <script>
            let mode = getQueryParam('mode');
            if (mode === 'in') {
                toggleForm('login');
            } else if (mode === 'up') {
                toggleForm('register');
            } else {
                toggleForm('login');
            }
      </script>
  `;
    $("#sign").html(sign);

    document.getElementById('loginForm').addEventListener('submit', async function (event) {
        event.preventDefault();
        showLoading();
        const username = document.getElementById('userLogin').value;
        const password = document.getElementById('passwordLogin').value;
        const url = "http://localhost:3000/auth/sign-in";
        const data = {
            username: username,
            password: password
        }
        const token = null;

        const result = postData(url, data, token);
        result.then(response => {
            const { result: message, success, user, token } = response;
            console.log(response);
        
            if (success) {
                // Armazenar dados no localStorage
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token);
        
                // Redirecionar para outra página
                window.location.href = "./index.html";
            } else {
                alert(message);
            }
        }).catch(error => {
            console.error("Ocorreu um erro:", error);
            alert("Ocorreu um erro. Verifique o console para detalhes.");
        });
        
        hideLoading();
        
    });

    document.getElementById('registerForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        showLoading();

        const nicknameRegister = document.getElementById('nicknameRegister').value.trim();
        const usernameRegister = document.getElementById('usernameRegister').value.trim();
        const emailRegister = document.getElementById('emailRegister').value.trim();
        const passwordRegister = document.getElementById('passwordRegister').value.trim();
        const confirmPasswordRegister = document.getElementById('confirmPasswordRegister').value.trim();

        const url = "http://localhost:3000/auth/sign-up";
        const data = {
            nickname: nicknameRegister,
            username: usernameRegister,
            email: emailRegister,
            password: passwordRegister,
            confirmPassword: confirmPasswordRegister,
        }
        const token = null;

        const result = postData(url, data, token);
        result.then(response => {
            const { result: message, success } = response;

            if(success){
                alert(message);
                toggleForm('login');
            }else{
                alert(message);
            }
          }).catch(error => {
            alert("Ocorreu um erro:", error);
          });

        hideLoading();
    });

    document.getElementById('forgotForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        showLoading();

        const emailForgot = document.getElementById('emailForgot').value.trim();

        const url = "http://localhost:3000/auth/insertCode";
        const data = {
            email: emailForgot
        }
        const token = null;

        const result = postData(url, data, token);
        result.then(response => {
            const { result: message, success } = response;
            console.log(response);
            if(success){
                alert(message);
                toggleForm('forgot2');
            }else{
                alert(message);
            }
          }).catch(error => {
            alert("Ocorreu um erro:", error);
          });

        hideLoading();
    });

    document.getElementById('forgotForm2').addEventListener('submit', async function (event) {
        event.preventDefault();

        showLoading();

        const emailForgot2 = document.getElementById('emailForgot2').value.trim();
        const passwordForgot2 = document.getElementById('passwordForgot2').value.trim();
        const confirmPasswordForgot2 = document.getElementById('confirmPasswordForgot2').value.trim();
        const codeForgot2 = document.getElementById('codeForgot2').value.trim();

        const url = "http://localhost:3000/auth/forgotPassword";
        const data = {
            email: emailForgot2,
            password: passwordForgot2,
            confirmPassword: confirmPasswordForgot2,
            code: codeForgot2
        }
        const token = null;

        const result = postData(url, data, token);
        result.then(response => {
            const { result: result, success } = response;
            console.log(response);
            if(success){
                alert(response.result);
                toggleForm('login');
            }else{
                alert(response.result);
            }
          }).catch(error => {
            alert("Ocorreu um erro:", error);
          });

        hideLoading();
    });

});

function toggleForm(formType) {
    if (formType === 'login') {
        document.getElementById('activeForm').style.display = 'none';
        document.getElementById('forgotForm2').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('forgotForm').style.display = 'none';
        document.querySelector('.login-btn').classList.add('active');
        document.querySelector('.register-btn').classList.remove('active');
    } else if (formType === 'register') {
        document.getElementById('activeForm').style.display = 'none';
        document.getElementById('forgotForm2').style.display = 'none';
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('forgotForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
        document.querySelector('.login-btn').classList.remove('active');
        document.querySelector('.register-btn').classList.add('active');
    } else if (formType === 'forgot') {
        document.getElementById('activeForm').style.display = 'none';
        document.getElementById('forgotForm2').style.display = 'none';
        document.getElementById('forgotForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'none';
        document.querySelector('.login-btn').classList.remove('active');
        document.querySelector('.register-btn').classList.remove('active');
    } else if (formType === 'forgot2') {
        document.getElementById('activeForm').style.display = 'none';
        document.getElementById('forgotForm2').style.display = 'block';
        document.getElementById('forgotForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'none';
        document.querySelector('.login-btn').classList.remove('active');
        document.querySelector('.register-btn').classList.remove('active');
    } else if (formType === 'active') {
        document.getElementById('forgotForm2').style.display = 'none';
        document.getElementById('forgotForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('activeForm').style.display = 'block';
        document.getElementById('loginForm').style.display = 'none';
        document.querySelector('.login-btn').classList.remove('active');
        document.querySelector('.register-btn').classList.remove('active');
        
    }
}
