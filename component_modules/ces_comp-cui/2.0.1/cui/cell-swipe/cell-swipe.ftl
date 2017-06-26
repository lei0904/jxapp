<x-cell
        v-clickoutside:touchstart="swipeMove"
        @click.native="swipeMove()"
        @touchstart.native="startDrag"
        @touchmove.native="onDrag"
        @touchend.native="endDrag"
        class="cui-cell-swipe"
        :title="title"
        :icon="icon"
        :label="label"
        :is-link="isLink"
        ref="cell"
        :value="value">
    <div
            slot="right"
            class="cui-cell-swipe-buttongroup"
            ref="right">
        <a
                class="cui-cell-swipe-button"
                v-for="btn in right"
                :style="btn.style"
                @click="btn.handler && btn.handler(), swipeMove()"
                v-html="btn.content"></a>
    </div>
    <div
            slot="left"
            class="cui-cell-swipe-buttongroup"
            ref="left">
        <a
                class="cui-cell-swipe-button"
                v-for="btn in left"
                :style="btn.style"
                @click="btn.handler && btn.handler(), swipeMove()"
                v-html="btn.content"></a>
    </div>
    <slot></slot>
    <span
            v-if="$slots.title"
            slot="title">
      <slot name="title"></slot>
    </span>
    <span
            v-if="$slots.icon"
            slot="icon">
      <slot name="icon"></slot>
    </span>
</x-cell>