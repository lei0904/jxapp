<transition name="cui-indicator">
    <div class="cui-indicator" v-show="visible">
        <div class="cui-indicator-wrapper" :style="{ 'padding': text ? '40px' : '30px' }">
            <spinner class="cui-indicator-spin" :type="convertedSpinnerType" :size="64"></spinner>
            <span class="cui-indicator-text" v-show="text">{{ text }}</span>
        </div>
        <div class="cui-indicator-mask" @touchmove.stop.prevent></div>
    </div>
</transition>