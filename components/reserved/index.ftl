<div>
    <div class="cars">
        <div class="normal_header">车辆</div>
        <div class="carBox">
            <div class="clearfix">
                <div class="car_item item" v-for="item in cars" @click="checkCar($event, item)">{{item.name}}({{item.brand}}|{{item.colour}}|{{item.plate}})</div>
            </div>
        </div>
    </div>
    <div class="time">
        <div class="normal_header">预约时间
            <div class="dateClickItem" @click="open('picker2')" >{{dateValue || "请选择接送时间"}}
            </div>
        </div>
        <div class="time_content">

            <div class="check_title" v-if="timetable_am.length > 0">
                <i></i>
                <span>上午</span>
            </div>


            <div class="checkItem clearfix" v-for="(item, index) in timetable_am" @click="timetableSelect(item)" :id="item.id">
                <div class="checkItem_time">
                    {{item.start_time}} - {{item.end_time}}
                </div>
                <div class="checkItem_count" v-if="!!item.trainee">已预约</div>
                <div class="checkItem_count" v-else="!!item.trainee">预约人数<span>{{item.all_times}}</span>人</div>
                <div class="checkItem_checked" v-if="!item.trainee">
                    <i></i>
                </div>
            </div>

            <div class="check_title" v-if="timetable_pm.length > 0">
                <i></i>
                <span>下午</span>
            </div>
            <div class="checkItem clearfix" v-for="(item, index) in timetable_pm" @click="timetableSelect(item)" :id="item.id">
                <div class="checkItem_time">
                    {{item.start_time}} - {{item.end_time}}
                </div>
                <div class="checkItem_count" v-if="!!item.trainee">已预约</div>
                <div class="checkItem_count" v-else="!!item.trainee">预约人数<span>{{item.all_times}}</span>人</div>
                <div class="checkItem_checked" v-if="!item.trainee">
                    <i></i>
                </div>
            </div>

        </div>
        <div class="time_tips">
            温馨提示：每车最多4个人，每天9:00 - 21:00 可以预约下一天的班次
        </div>
    </div>
    <div class="reserved">
        <div class="normal_header">
            预约接送
            <cui-switch v-model="switchValue"></cui-switch>
        </div>
        <div v-show="switchValue">
            <cui-field class="timePicker" label="接送时间" >
                <div class="timeClickItem" @click="open('picker3')" >{{timeValue || "请选择日期"}}</div>
            </cui-field>
            <cui-field label="接送地点" placeholder="请输入接送地点" v-model="address"></cui-field>
        </div>
    </div>
    <div class="bottom_but">
        <cui-button type="primary" @click.native="submit">提交</cui-button>
    </div>

    <cui-datetime-picker
            ref="picker2"
            type="date"
            @confirm="handleChange2"
            :startDate="startDate"
            :endDate="endDate">
    </cui-datetime-picker>
    <cui-datetime-picker
            ref="picker3"
            type="time"
            @confirm="handleChange1">
    </cui-datetime-picker>
</div>