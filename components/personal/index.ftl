<div class="personal">
    <div class="atavar-content">
        <img src="../../views/lib/images/avatar.jpeg" alt="" @click="select_method()">
        <div class="atavar-name">路人甲</div>
    </div>
    <cui-cell title="联系客服" icon="back" is-link ></cui-cell>
    <cui-cell title="我的邀请码" icon="back" is-link></cui-cell>
    <cui-actionsheet :actions="actions" ref="imgSelect"></cui-actionsheet>
</div>