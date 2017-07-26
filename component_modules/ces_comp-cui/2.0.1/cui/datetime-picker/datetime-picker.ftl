<div class="datetime-picker-wrap-div" v-show="visible">
    <cui-popup v-show="visible" position="bottom" class="cui-datetime" ref="popup">
        <cui-picker
                :slots="dateSlots"
                @change="onChange"
                :visible-item-count="5"
                class="cui-datetime-picker"
                ref="picker"
                show-toolbar>
            <span class="cui-datetime-action cui-datetime-cancel" @click="close">{{ cancelText }}</span>
            <span class="cui-datetime-action cui-datetime-confirm" @click="confirm">{{ confirmText }}</span>
        </cui-picker>
    </cui-popup>
</div>