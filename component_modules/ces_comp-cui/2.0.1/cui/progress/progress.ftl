<div class="cui-progress">
    <slot name="start"></slot>
    <div class="cui-progress-content">
        <div class="cui-progress-runway" :style="{ height: barHeight + 'px' }"></div>
        <div class="cui-progress-progress" :style="{ width: value + '%', height: barHeight + 'px' }"></div>
    </div>
    <slot name="end"></slot>
</div>