<transition :name="currentTransition">
    <div v-show="currentValue" class="cui-popup" :class="[position ? 'cui-popup-' + position : '']">
        <slot></slot>
    </div>
</transition>