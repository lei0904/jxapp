<a class="cui-tab-item"
   @click="$parent.$emit('input', id)"
   :class="{ 'is-selected': $parent.value === id }">
    <div class="cui-tab-item-icon"><slot name="icon"></slot></div>
    <div class="cui-tab-item-label"><slot></slot></div>
</a>