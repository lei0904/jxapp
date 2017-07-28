<div>
    <div class="part">
        <!--<div class="part_header">我的接送</div>-->
        <div class="part_content">
            <div class="list_item clearfix" v-for="item in list">
                <div> {{item.shuttle_date}} {{item.shuttle_time}} </div>
                <div> {{item.shuttle_address}} </div>
            </div>
        </div>
    </div>
</div>