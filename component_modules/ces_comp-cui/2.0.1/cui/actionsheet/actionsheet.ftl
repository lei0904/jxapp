<transition name="actionsheet-float">
    <div v-show="currentValue" class="cui-actionsheet">
        <ul class="cui-actionsheet-list" :style="{ 'margin-bottom': cancelText ? '5px' : '0' }">
            <li v-for="item in actions" class="cui-actionsheet-listitem" @click="itemClick(item)">{{ item.name }}</li>
        </ul>
        <a class="cui-actionsheet-button" @click="currentValue = false" v-if="cancelText">{{ cancelText }}</a>
    </div>
</transition>