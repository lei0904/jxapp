<div class="cui-swipe">
    <div class="cui-swipe-items-wrap" ref="wrap">
        <slot></slot>
    </div>
    <div class="cui-swipe-indicators" v-show="showIndicators">
        <div class="cui-swipe-indicator"
             v-for="(page, $index) in pages"
             :class="{ 'is-active': $index === index }"></div>
    </div>
</div>