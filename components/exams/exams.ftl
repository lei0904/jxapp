<transition name="fold">
    <v-touch v-on:swipeleft="nextAnswer" v-on:swiperight="upAnswer" class="touchClass">
        <div class="exams" >
        <div class="question-content" >
                <div class="question">
                    <div class="question-type">
                        <span v-if="list.optiontype == 0">判断题</span>
                        <span v-if="list.optiontype == 1">单选题</span>
                        <span v-if="list.optiontype == 2">多选题</span>
                    </div>
                    <div class="question-item">
                            <span  @click="collectQ">
                                <em class="start-uncheck" v-show="!showStart"></em>
                                <em class="start-checked" v-show="showStart"></em>
                            </span>
                            <span class="item">
                               {{list.question}}
                            </span>
                    </div>
                    <div v-if="list.mediacontent" class="img-content">
                        <img   v-if="list.mediatype == 1" :src="list.mediacontent" alt="">

                        <video   v-if="list.mediatype == 2" :src="list.mediacontent"  controls  webkit-playsinline>
                            您的浏览器不支持 HTML5 video 标签。
                        </video>
                    </div>
                </div>
                <div class="answer">
                    <div  v-if="list.optiontype !=2 " >
                        <cui-radio v-model="answer" :options='list.options||options'></cui-radio>
                    </div>
                    <div v-else >
                        <cui-checklist  v-model="checklist"  :options='list.options||options'></cui-checklist>
                    </div>
                </div>
                <div class="explain" v-show="explainShow">
                    <div>答案: <span >{{list.answer}}</span></div>
                    <div class="detail-desc">详细解释:{{list.explain}}</div>
                </div>
        </div>
    </div>
    </v-touch>
</transition>