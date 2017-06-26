<div class="cui-msgbox-wrapper">
    <transition name="msgbox-bounce">
        <div class="cui-msgbox" v-show="value">
            <div class="cui-msgbox-header" v-if="title !== ''">
                <div class="cui-msgbox-title">{{ title }}</div>
            </div>
            <div class="cui-msgbox-content" v-if="message !== ''">
                <div class="cui-msgbox-message"><p>{{ message }}</p></div>
                <div class="cui-msgbox-input" v-show="showInput">
                    <input type="text" v-model="inputValue" :placeholder="inputPlaceholder" ref="input">
                    <div class="cui-msgbox-errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
                </div>
            </div>
            <div class="cui-msgbox-btns">
                <button :class="[ cancelButtonClasses ]" v-show="showCancelButton" @click="handleAction('cancel')">{{ cancelButtonText }}</button>
                <button :class="[ confirmButtonClasses ]" v-show="showConfirmButton" @click="handleAction('confirm')">{{ confirmButtonText }}</button>
            </div>
        </div>
    </transition>
</div>