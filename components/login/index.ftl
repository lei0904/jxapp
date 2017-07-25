<div class="login_bg">
    <div class="login-form is-12">
        <div class="login_con clearfix">
            <i class="user_icon icon"></i>
            <input
                    v-validate="'required|mobile'"
                    v-model="user"
                    class="login_input login-user"
                    type="text"
                    name="手机号码"
                    placeholder="请输入手机号码">
        </div>
        <div class="login_con clear">
            <i class="password_icon icon"></i>
            <input class="login_input login-password"
                   v-validate="'required'"
                   v-model="password"
                   type="password"
                   name="登录密码"
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


    <!--
<div class="column is-12">
    <label class="label" for="email">Email</label>
    <p :class="{ 'control': true }">
        <input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" placeholder="Email">
        <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
    </p>
</div>
-->
</div>

