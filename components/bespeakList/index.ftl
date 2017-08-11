<div id="bespeakList">
    <div class="part">
        <div class="part_header">当前进度</div>
        <div class="part_content">
            <p>{{trainee|traineeStatus}}</p>
        </div>
    </div>

    <div class="part">
        <div class="part_header">我的预约</div>
        <div class="part_content">
            <div class="list_item clearfix" v-for="item in pending">
                <span class="list_item_left"> {{item.t_date}} {{item.t_start_time|formatTime}}-{{item.t_end_time|formatTime}} </span>
                <span class="list_item_center"> {{item.c_name}}({{item.c_plate}}) </span>
                <span class="list_item_right"> 待确认 </span>
            </div>
            <div v-show="emptyNow" class="emptyNow">
                暂无预约
            </div>
        </div>
    </div>

    <div class="part">
        <div class="part_header">历史预约</div>
        <div class="part_content">
            <div class="list_item clearfix" v-for="item in success">
                <span class="list_item_left"> {{item.t_date}} {{item.t_start_time|formatTime}}-{{item.t_end_time|formatTime}} </span>
                <span class="list_item_center"> {{item.c_name}}({{item.c_plate}}) </span>
                <span class="list_item_right"> {{item|time}} </span>
            </div>
            <div v-show="emptyPast" class="emptyPast">
                暂无预约
            </div>
        </div>
    </div>
</div>