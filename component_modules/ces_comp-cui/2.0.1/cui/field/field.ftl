<x-cell
        class="cui-field"
        :title="label"
        v-clickoutside="doCloseActive"
        :class="[{
      'is-textarea': type === 'textarea',
      'is-nolabel': !label
    }]">
    <textarea
            ref="textarea"
            class="cui-field-core"
            :placeholder="placeholder"
            v-if="type === 'textarea'"
            :rows="rows"
            :disabled="disabled"
            :readonly="readonly"
            v-model="currentValue">
    </textarea>
    <input
            ref="input"
            class="cui-field-core"
            :placeholder="placeholder"
            :number="type === 'number'"
            v-else
            :type="type"
            @focus="active = true"
            :disabled="disabled"
            :readonly="readonly"
            :value="currentValue"
            @input="handleInput">
    <div
            @click="handleClear"
            class="cui-field-clear"
            v-if="!disableClear"
            v-show="currentValue && type !== 'textarea' && active">
        <i class="cesui cesui-field-error"></i>
    </div>
    <span class="cui-field-state" v-if="state" :class="['is-' + state]">
      <i class="cesui" :class="['cesui-field-' + state]"></i>
    </span>
    <div class="cui-field-other">
        <slot></slot>
    </div>
</x-cell>