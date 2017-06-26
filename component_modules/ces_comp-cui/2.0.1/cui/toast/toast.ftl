<transition name="cui-toast-pop">
    <div class="cui-toast" v-show="visible" :class="customClass" :style="{ 'padding': iconClass === '' ? '10px' : '20px' }">
        <i class="cui-toast-icon" :class="iconClass" v-if="iconClass !== ''"></i>
        <span class="cui-toast-text" :style="{ 'padding-top': iconClass === '' ? '0' : '10px' }">{{ message }}</span>
    </div>
</transition>