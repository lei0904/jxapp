<div class="cui-indexlist">
    <ul class="cui-indexlist-content" ref="content" :style="{ 'height': currentHeight + 'px', 'margin-right': navWidth + 'px'}">
        <slot></slot>
    </ul>

    <div class="cui-indexlist-nav" @touchstart="handleTouchStart" ref="nav">
        <ul class="cui-indexlist-navlist">
            <li class="cui-indexlist-navitem" v-for="section in sections">{{ section.index }}</li>
        </ul>
    </div>

    <div class="cui-indexlist-indicator" v-if="showIndicator" v-show="moving">{{ currentIndicator }}</div>
</div>