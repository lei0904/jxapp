<div class="cui-radiolist">
    <label class="cui-radiolist-title" v-text="title"></label>
    <x-cell v-for="option in options">
        <label class="cui-radiolist-label" slot="title">
        <span
                :class="{'is-right': align === 'right'}"
                class="cui-radio">
          <input
                  class="cui-radio-input"
                  type="radio"
                  v-model="currentValue"
                  :disabled="option.disabled"
                  :value="option.value || option">
          <span class="cui-radio-core"></span>
        </span>
            <span class="cui-radio-label" v-text="option.label || option"></span>
        </label>
    </x-cell>
</div>