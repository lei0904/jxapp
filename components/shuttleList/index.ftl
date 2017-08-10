<div>
    <div class="part">
        <!--<div class="part_header">我的接送</div>-->
        <div v-show="!empty" class="part_content">
            <div class="list_item clearfix" v-for="item in list">
                <div> {{item.shuttle_date}} {{item.shuttle_time}} </div>
                <div> {{item.shuttle_address}} </div>
            </div>
        </div>
        <div v-show="empty" class="empty">
            暂无预约
        </div>
    </div>
</div>