<div>
    <div class="combo">
        <div class="combo_header">套餐名称: {{combo.name}}</div>
    </div>

    <div class="combo">
        <div class="combo_header">资费标准: ¥ {{combo.postage}}</div>
    </div>

    <div class="combo">
        <div class="combo_header">服务承诺:</div>
        <div class="combo_content" v-html="combo.promise">
        </div>
    </div>

    <div class="combo">
        <div class="combo_header">费用明细:</div>
        <div class="combo_content" v-html="combo.detailed">
        </div>
    </div>

    <div class="combo">
        <div class="combo_header">预约规则:</div>
        <div class="combo_content rule">
            {{combo | showComboOrderWeeks}}
            <br/>
            {{combo | showComboOrderTimes}}
        </div>
    </div>

</div>