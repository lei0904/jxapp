<div>
    <div class="carousel">
        <cui-swipe :auto="4000">
            <cui-swipe-item v-for="banner in bannerImages" @click.native="bannerClick(banner)">
                <img class="swipe-image" :src="banner.path"/>
            </cui-swipe-item>
        </cui-swipe>
    </div>
    <div class="package-title">学车套餐</div>
    <div class="package">
        <div class="item" v-for="(combo, index) in combos">
            <div class="package_item_header clearfix">
                <div :class="(index+1) % 3 == 0 ? 'package_item_header_name blue_item' : (index+1) % 2 === 0 ? 'package_item_header_name green_item' : 'package_item_header_name yellow_item'">{{combo.name}}</div>
                <div class="package_item_header_price">¥{{combo.postage}}</div>
            </div>
            <div class="package_item_content cui-cell-allow-right">
                {{combo | showComboOrderWeeks}}
                <br/>
                {{combo | showComboOrderTimes}}
            </div>
            <div class="package_item_tips clearfix">
                <i></i>
                <span>{{combo.keyword}}</span>
            </div>
        </div>
    </div>
    <div class="select-icon clearfix">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
    </div>
</div>