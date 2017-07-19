<div class="examMock">
    <div class="question-content" >
        <div class="question">
            <div class="question-item">
                <div class="question-type">
                    <span v-if="list.optiontype == 0">判断题</span>
                    <span v-if="list.optiontype == 1">单选题</span>
                    <span v-if="list.optiontype == 2">多选题</span>
                </div>
                <span v-text="questionId"></span>、
                {{list.question}}
            </div>
            <div v-if="list.mediacontent" class="img-content">
                <img :src="list.mediacontent" alt="">
            </div>
        </div>
        <div class="answer">
            <div  v-if="list.optiontype !=2 " >
                <cui-radio v-model="answer" :options='list.options'></cui-radio>
            </div>
            <div v-else >
                <cui-checklist  v-model="checklist"  :options='list.options'></cui-checklist>
            </div>
        </div>
        <div class="explain" v-show="explainShow">
            <div>答案: <span v-for="item in rightAnswer">{{item}}</span></div>
            <div class="detail-desc">详细解释:{{list.explain}}</div>
        </div>
        <div class="next-btn-content" v-show="showNext">
            <cui-button class="next-btn" size="normal" type="primary" @click.native="nextAnswer">下一题</cui-button>
        </div>
    </div>
</div>