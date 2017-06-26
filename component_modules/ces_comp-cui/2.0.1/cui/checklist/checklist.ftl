<div class="cui-checklist" :class="{ 'is-limit': max <= currentValue.length }">
    <label class="cui-checklist-title" v-text="title"></label>
    <x-cell v-for="option in options">
        <label class="cui-checklist-label" slot="title">
        <span
                :class="{'is-right': align === 'right'}"
                class="cui-checkbox">
          <input
                  class="cui-checkbox-input"
                  type="checkbox"
                  v-model="currentValue"
                  :disabled="option.disabled"
                  :value="option.value || option">
          <span class="cui-checkbox-core"></span>
        </span>
            <span class="cui-checkbox-label" v-text="option.label || option"></span>
        </label>
    </x-cell>
</div>