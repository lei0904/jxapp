<a class="cui-cell" :href="href">
    <span class="cui-cell-mask" v-if="isLink"></span>
    <div class="cui-cell-left">
        <slot name="left"></slot>
    </div>
    <div class="cui-cell-wrapper">
        <div class="cui-cell-title">
            <slot name="icon">
                <i v-if="icon" class="cesui" :class="'mintui-' + icon"></i>
            </slot>
            <slot name="title">
                <span class="cui-cell-text" v-text="title"></span>
                <span v-if="label" class="cui-cell-label" v-text="label"></span>
            </slot>
        </div>
        <div class="cui-cell-value">
            <slot>
                <span v-text="value"></span>
            </slot>
        </div>
    </div>
    <div class="cui-cell-right">
        <slot name="right"></slot>
    </div>
    <i v-if="isLink" class="cui-cell-allow-right"></i>
</a>