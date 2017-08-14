<div id="changePassword">
    <cui-field type="password"  label="" v-model="password" placeholder="请输入密码" ></cui-field>
    <cui-field type="password" label="" v-model="password2" placeholder="请再次输入密码" ></cui-field>

    <div class="bottom_but">
        <cui-button type="primary" @click.native="submit">提交</cui-button>
    </div>
</div>