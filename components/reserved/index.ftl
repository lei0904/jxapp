<div>
    <div class="cars">
        <div class="normal_header">车辆</div>
        <div class="carBox">
            <div class="clearfix">
                <div class="item" :class="[checkedCars == 1 ? 'checked':'']" @click="checkCars(1)">A辆车</div>
                <div class="item" :class="[checkedCars == 2 ? 'checked':'']" @click="checkCars(2)">B辆车</div>
                <div class="item" :class="[checkedCars == 3 ? 'checked':'']" @click="checkCars(3)">C辆车</div>
                <div class="item" :class="[checkedCars == 4 ? 'checked':'']" @click="checkCars(4)">D辆车</div>
                <div class="item" :class="[checkedCars == 5 ? 'checked':'']" @click="checkCars(5)">E辆车</div>
                <div class="item" :class="[checkedCars == 6 ? 'checked':'']" @click="checkCars(6)">F辆车</div>
            </div>
        </div>
    </div>
    <div class="time">
        <div class="normal_header">预约时间
            <div class="dateClickItem" @click="open('picker2')" >{{dateValue || "请选择接送时间"}}
            </div>
        </div>
        <cui-datetime-picker
                ref="picker2"
                type="date"
                @confirm="handleChange2"
                :startDate="startDate"
                :endDate="endDate">
        </cui-datetime-picker>
        <div class="time_content">
            <div class="check_title">
                <i></i>
                <span>上午</span>
            </div>
            <div class="checkItem clearfix" :class="[checkedItem1 == 1 ? 'checked' : '']" @click="checkedItema(1)">
                <div class="checkItem_time">
                    7:00 - 8:00
                </div>
                <div class="checkItem_count">预约人数<span>3</span>人</div>
                <div class="checkItem_checked">
                    <i></i>
                </div>
            </div>
            <div class="checkItem clearfix" :class="[checkedItem1 == 2 ? 'checked' : '']" @click="checkedItema(2)">
                <div class="checkItem_time">
                    7:00 - 8:00
                </div>
                <div class="checkItem_count">预约人数<span>3</span>人</div>
                <div class="checkItem_checked">
                    <i></i>
                </div>
            </div>
            <div class="checkItem clearfix" :class="[checkedItem1 == 3 ? 'checked' : '']" @click="checkedItema(3)">
                <div class="checkItem_time">
                    7:00 - 8:00
                </div>
                <div class="checkItem_count">预约人数<span>3</span>人</div>
                <div class="checkItem_checked">
                    <i></i>
                </div>
            </div>

            <div class="check_title">
                <i></i>
                <span>下午</span>
            </div>
            <div class="checkItem clearfix" :class="[checkedItem2 == 1 ? 'checked' : '']" @click="checkedItemb(1)">
                <div class="checkItem_time">
                    7:00 - 8:00
                </div>
                <div class="checkItem_count">预约人数<span>3</span>人</div>
                <div class="checkItem_checked">
                    <i></i>
                </div>
            </div>
            <div class="checkItem clearfix" :class="[checkedItem2 == 2 ? 'checked' : '']" @click="checkedItemb(2)">
                <div class="checkItem_time">
                    7:00 - 8:00
                </div>
                <div class="checkItem_count">预约人数<span>3</span>人</div>
                <div class="checkItem_checked">
                    <i></i>
                </div>
            </div>
            <div class="checkItem clearfix" :class="[checkedItem2 == 3 ? 'checked' : '']" @click="checkedItemb(3)">
                <div class="checkItem_time">
                    7:00 - 8:00
                </div>
                <div class="checkItem_count">预约人数<span>3</span>人</div>
                <div class="checkItem_checked">
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
        <div>
            <cui-field class="timePicker" label="接送时间" >
                <div class="timeClickItem" @click="open('picker3')" >{{timeValue || "请选择日期"}}</div>
            </cui-field>
            <cui-field label="接送地点" placeholder="请输入接送地点" ></cui-field>
            <cui-datetime-picker
                    ref="picker3"
                    type="time"
                    @confirm="handleChange1">
            </cui-datetime-picker>
        </div>
    </div>
    <div class="bottom_but">
        <cui-button type="primary">提交</cui-button>
    </div>
</div>