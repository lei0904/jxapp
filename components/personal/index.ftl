<div>
    <div class="personal_con">
        <div class="circle_con">
            <img :src="favsrc" @click="select_method()" @error="favsrcerror()">
            <cui-actionsheet :actions="actions" ref="take_photo"></cui-actionsheet>
        </div>
        <div class="user_name">{{name}}</div>
    </div>

    <div class="nav_cell">
        <router-link to="/changePassword">
            <cui-cell title="修改密码"  icon="more" class="cui_title_img">
                <div slot="icon" class="img_con changePassword_icon"></div>
            </cui-cell>
        </router-link>
        <router-link to="/personalInfo" v-show="showinfo">
            <cui-cell title="个人信息" icon="more" class="cui_title_img">
                <div slot="icon" class="img_con changeMessage_icon"></div>
            </cui-cell>
        </router-link>
    </div>

    <div class="nav_cell">
        <cui-cell title="联系我们"  icon="more" class="cui_title_img">
            <div slot="icon" class="img_con callUs_icon"></div>
        </cui-cell>
        <cui-cell title="关于我们" icon="more" class="cui_title_img">
            <div slot="icon" class="img_con feedBack_icon"></div>
        </cui-cell>
        <router-link to="/feedBack">
            <cui-cell title="意见反馈" icon="more" class="cui_title_img">
                <div slot="icon" class="img_con aboutUs_icon"></div>
            </cui-cell>
        </router-link>
    </div>
    <cui-button  size="small" type="default" class="primary_submit" @click.native="signOut()">退出登录</cui-button>
</div>