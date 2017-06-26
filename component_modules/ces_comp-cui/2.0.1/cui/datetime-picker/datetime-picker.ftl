<div>
    <cui-popup v-show="visible" position="bottom" class="cui-datetime" ref="popup">
        <cui-picker
                :slots="dateSlots"
                @change="onChange"
                :visible-item-count="7"
                class="cui-datetime-picker"
                ref="picker"
                show-toolbar>
            <span class="cui-datetime-action cui-datetime-cancel" @click="close">{{ cancelText }}</span>
            <span class="cui-datetime-action cui-datetime-confirm" @click="confirm">{{ confirmText }}</span>
        </cui-picker>
    </cui-popup>
</div>