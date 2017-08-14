<div id="changeName">
    <cui-field  label="" v-validate="'required'" data-vv-name="验证码" v-model="name" placeholder="请输入姓名" ></cui-field>

    <div class="bottom_but">
        <cui-button type="primary" @click.native="submit">提交</cui-button>
    </div>
</div>