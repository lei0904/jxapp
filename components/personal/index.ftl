<div class="personal">
    <div class="atavar-content">
        <!--
        <attachment-upload ref="au"
                           :url="avatar_upload_url"
                           :business="'avatar'"
                           :preview="'avatar_preview'">
        </attachment-upload>

        <img :src="avatar" alt="" id="avatar_preview" @click="select_method()">
        <div class="atavar-name">{{name}}</div>
        -->
        <cui-cell title="姓名" :value="name" icon="back"></cui-cell>
        <cui-cell title="手机" :value="mobile" icon="back"></cui-cell>
        <cui-cell title="所选套餐" :value="combo" icon="back"></cui-cell>
        <cui-cell title="学车阶段" :value="status" icon="back"></cui-cell>

    </div>
    <cui-cell title="预约记录" icon="back" is-link @click.native="toBespeakList"></cui-cell>
    <cui-cell title="接送记录" icon="back" is-link @click.native="toShuttleList"></cui-cell>
    <cui-cell title="我的邀请码" :value="invite" icon="back"></cui-cell>

    <div class="bottom_but">
        <cui-button type="primary" @click.native="logout">退出登录</cui-button>
    </div>
    <cui-actionsheet :actions="actions" ref="imgSelect"></cui-actionsheet>
</div>