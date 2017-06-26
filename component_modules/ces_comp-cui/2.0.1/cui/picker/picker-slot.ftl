<div class="picker-slot" :class="classNames" :style="flexStyle">
    <div v-if="!divider" ref="wrapper" class="picker-slot-wrapper" :class="{ dragging: dragging }" :style="{ height: contentHeight + 'px' }">
        <div class="picker-item" v-for="itemValue in mutatingValues" :class="{ 'picker-selected': itemValue === currentValue }">{{ itemValue }}</div>
    </div>
    <div v-if="divider">{{ content }}</div>
</div>