<button
        class="cui-button"
        :class="['cui-button--' + type, 'cui-button--' + size, {
      'is-disabled': disabled,
      'is-plain': plain
    }]"
        @touchstart="handleClick">
    <span class="cui-button-icon" v-if="icon || $slots.icon">
      <slot name="icon">
        <i v-if="icon" class="cesui" :class="'cesui-' + icon"></i>
      </slot>
    </span>
    <label class="cui-button-text"><slot></slot></label>
</button>