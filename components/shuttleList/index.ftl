<div>
    <div class="part">
        <!--<div class="part_header">我的接送</div>-->
        <div v-show="!empty" class="part_content">
            <div class="list_item clearfix" v-for="item in list">
                <div> {{item.shuttle_date}} {{item.shuttle_time}}
                    <span class="s_status" v-if="item.audit_status == 1">待审核</span>
                    <span class="s_status" v-if="item.audit_status == 2">审核通过</span>
                    <span class="s_status" v-if="item.audit_status == 3">审核驳回</span>
                </div>
                <div> {{item.shuttle_address}} </div>
            </div>
        </div>
        <div v-show="empty" class="empty">
            暂无预约
        </div>
    </div>
</div>