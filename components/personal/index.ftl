<div class="personal">
    <div class="atavar-content">
        <img :src="avatar" alt="" @click="select_method()">
        <div class="atavar-name">路人甲</div>
    </div>
    <cui-cell title="预约记录" icon="back" is-link ></cui-cell>
    <cui-cell title="接送记录" icon="back" is-link ></cui-cell>
    <cui-cell title="我的邀请码" :value="invite" icon="back"></cui-cell>

    <div class="bottom_but">
        <cui-button type="primary" @click.native="logout">退出登录</cui-button>
    </div>
    <cui-actionsheet :actions="actions" ref="imgSelect"></cui-actionsheet>
</div>