<div>
    <cui-swipe :auto="3000">
        <cui-swipe-item class="slide"
                        v-for="item in banners"
                        @click.native="bannerView(item)"
        ><img v-lazy="attachment + item.covers"></cui-swipe-item>
    </cui-swipe>

    <div class="main_function clear">
        <router-link v-for="item in menu" :to="item.to">
            <div class="function_icon"  :class="item.size">
                <img :src="item.image">
                <span>{{item.name}}</span>
            </div>
        </router-link>
    </div>

    <div class="news_tab">
        <cui-navbar class="news_tab_nav" v-model="selected">
            <cui-tab-item id="new_item1">新闻动态</cui-tab-item>
            <cui-tab-item id="new_item2">政策法规</cui-tab-item>
        </cui-navbar>
        <cui-tab-container class="news_tab_list" v-model="selected">
            <cui-tab-container-item id="new_item1" >
                <div class="item_box clear" v-for="item in xwdt" @click="articleView(item.title, item.url, item.id)" >
                    <div class="item_left clear">
                        <div class="item_con clear">
                            {{item.title}}
                            <div class="item_con_time">
                                {{item.add_time}}
                            </div>
                        </div>
                        <div class="item_ext clear">
                            <div class="icon_text">
                                {{item.source}}
                            </div>
                            <div class="ext_message">
                                <span :name="'hits_' + item.id">{{item.hits}}</span>次点击
                            </div>
                        </div>
                    </div>
                    <div class="item_right">
                        <img v-lazy="attachment + item.logo" :src="attachment + item.logo">
                    </div>
                </div>
            </cui-tab-container-item>
            <cui-tab-container-item id="new_item2">
                <div class="item_box clear" v-for="item in zcfg" @click="articleView(item.title, item.url, item.id)">
                    <div class="item_left clear">
                        <div class="item_con clear">
                            {{item.title}}
                            <div class="item_con_time">
                                {{item.add_time}}
                            </div>
                        </div>
                        <div class="item_ext clear">
                            <div class="icon_text">
                                {{item.source}}
                            </div>
                            <div class="ext_message">
                                <span :name="'hits_' + item.id">{{item.hits}}</span>次点击
                            </div>
                        </div>
                    </div>
                    <div class="item_right">
                        <img v-lazy="attachment + item.logo" >
                    </div>
                </div>
            </cui-tab-container-item>
        </cui-tab-container>
    </div>
</div>