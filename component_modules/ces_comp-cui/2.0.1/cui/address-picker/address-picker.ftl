<div>
    <cui-popup v-show="visible" position="bottom" class="cui-address-picker" ref="popup">
        <cui-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5" show-toolbar>
            <span class="cui-address-picker-action cui-address-picker-cancel" @click="close">{{ cancelText }}</span>
            <span class="cui-address-picker-action cui-address-picker-confirm" @click="confirm">{{ confirmText }}</span>
        </cui-picker>
    </cui-popup>
</div>