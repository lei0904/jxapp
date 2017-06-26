<div
        v-show="$parent.swiping || id === $parent.currentActive"
        class="cui-tab-container-item">
    <slot></slot>
</div>