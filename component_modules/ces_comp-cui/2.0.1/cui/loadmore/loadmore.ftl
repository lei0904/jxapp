<!--<div class="cui-loadmore-content" :class="{ 'is-dropped': topDropped || bottomDropped}"
    :style="{ 'transform': 'translate3d(0, ' + translate + 'px, 0)' }">-->
<div class="cui-loadmore">
    <div class="cui-loadmore-content" :class="{ 'is-dropped': topDropped || bottomDropped}"
         :style="{ 'transform': 'translate3d(0, ' + translateValue + ', 0)' }">
        <slot name="top">
            <div class="cui-loadmore-top" v-if="topMethod">
                <spinner v-if="topStatus === 'loading'" class="cui-loadmore-spinner" :size="20" type="fading-circle"></spinner>
                <span class="cui-loadmore-text">{{ topText }}</span>
            </div>
        </slot>
        <slot></slot>
        <slot name="bottom">
            <div class="cui-loadmore-bottom" v-if="bottomMethod">
                <spinner v-if="bottomStatus === 'loading'" class="cui-loadmore-spinner" :size="20" type="fading-circle"></spinner>
                <span class="cui-loadmore-text">{{ bottomText }}</span>
            </div>
        </slot>
    </div>
</div>