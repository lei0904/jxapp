<div class="cui-switch">
    <input class="cui-switch-input" type="checkbox" v-model="currentValue">
    <span class="cui-switch-core" v-on:click="currentValueChange"></span>
    <div class="cui-switch-label"><slot></slot></div>
</div>