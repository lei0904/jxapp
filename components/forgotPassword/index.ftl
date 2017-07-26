<div>
    <div class="register_head">
        <img src="../../views/lib/images/logo-main.png">
    </div>
    <div class="register_content">

        <section class="MessageLogin-FsPlX">
            <input type="tel" v-validate="'required|mobile'" name="手机号码" maxlength="11" v-model="mobile" placeholder="手机号码">
            <button @click="getVerifyCode" class="CountButton">
                获取验证码
            </button>
        </section>
        <cui-field  label="" v-validate="'required'" data-vv-name="验证码" v-model="code" placeholder="请输入验证码" ></cui-field>
        <cui-field  label="" v-validate="'required'" data-vv-name="新密码" name="新密码" v-model="password" placeholder="请输入新密码" type="password"></cui-field>
    </div>
    <div class="register_end">
        <cui-button class="current-button" size="large" @click.native="submit">完成</cui-button>
    </div>
</div>