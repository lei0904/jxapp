<div>
    <div class="register_head">
        <img src="../../views/lib/images/logo-main.png">
    </div>
    <div class="register_content">

        <section class="MessageLogin-FsPlX">
            <input type="tel" maxlength="11" v-model="mobile" placeholder="手机号">
            <button class="CountButton" @click="getVerifyCode">
                获取验证码
            </button>
        </section>
        <cui-field  label="" placeholder="请输入验证码" ></cui-field>
        <cui-field  label="" placeholder="请设定密码" type="password"></cui-field>
        <cui-field  label="" placeholder="请确认密码" type="password"></cui-field>
        <cui-field  label="" placeholder="请输入邀请码" ></cui-field>
    </div>
    <div class="register_end">
        <cui-button class="current-button" size="large" @click.native="submit">完成</cui-button>
    </div>
</div>