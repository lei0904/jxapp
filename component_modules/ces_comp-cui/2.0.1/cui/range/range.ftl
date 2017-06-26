<div class="cui-range" :class="{ 'cui-range--disabled': disabled }">
    <slot name="start"></slot>
    <div class="cui-range-content" ref="content">
        <div class="cui-range-runway" :style="{ 'border-top-width': barHeight + 'px' }"></div>
        <div class="cui-range-progress" :style="{ width: progress + '%', height: barHeight + 'px' }"></div>
        <div class="cui-range-thumb" ref="thumb" :style="{ left: progress + '%' }"></div>
    </div>
    <slot name="end"></slot>
</div>