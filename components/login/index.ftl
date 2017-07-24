<div class="login_bg">
    <div class="login-form">
        <div class="login_con clearfix">
            <i class="user_icon icon"></i>
            <input class="login_input login-user"
                   v-model="user"
                   type="text"
                   value=""
                   placeholder="请输入用户名">
        </div>
        <div class="login_con clear">
            <i class="password_icon icon"></i>
            <input class="login_input login-password"
                   v-model="password"
                   type="password"
                   value=""
                   placeholder="请输入登录密码">
        </div>

        <cui-button @click.native="doLogin"
                    class="login-form-button"
                    size="large">登录</cui-button>
        <div class="bottom_con clear">
            <span class="left"><router-link  to="/register"><span>注册</span></router-link></span>
            <span class="right"><router-link  to="/forgotPassword"><span>忘记密码</span></router-link></span>
        </div>
    </div>
</div>