<div class="exercise">
    <cui-navbar class="page-part" v-model="selected" >
        <cui-tab-item id="1">科目一</cui-tab-item>
        <cui-tab-item id="2">科目二</cui-tab-item>
        <cui-tab-item id="3">科目三</cui-tab-item>
        <cui-tab-item id="4">科目四</cui-tab-item>
    </cui-navbar>
    <div class="exercise-content">
    <cui-tab-container v-model="selected">
        <cui-tab-container-item id="1">
            <div >
                <div class="practice">答题练习</div>
                <div class="exercise-model">
                    <div class="exercise-title">
                        <div class="exercise-item" @click="toPractice(1)">
                            <i class="sxlx"></i>
                            <span class="titles ">顺序练习</span>
                        </div>
                        <div class="exercise-item" @click="toPractice(2)">
                            <i class="zxlx"></i>
                            <span class="titles">专项练习</span>
                        </div>
                    </div>
                    <div class="exercise-title">
                        <div class="exercise-item"  @click="toPractice(3)">
                            <i class="sjlx"></i>
                            <span class="titles">随机练习</span>
                        </div>
                        <div class="exercise-item"  @click="toPractice(4)">
                            <i class="mnlx"></i>
                            <span class="titles">模拟考试</span>
                        </div>
                    </div>
                </div>
            </div>
            <div >
                <div class="practice">我的练习</div>
                <div class="exercise-history">
                    <div class="exercise-title">
                        <div class="exercise-item" @click="toPractice(5)">
                            <i class="wdsc"></i>
                            <span>我的收藏</span>
                        </div>
                        <div class="exercise-item" @click="toPractice(6)">
                            <i class="wdct"></i>
                            <span>我的错题</span>
                        </div>
                    </div>
                    <div class="exercise-title">
                        <div class="exercise-item" @click="toPractice(7)">
                            <i class="dtjq"></i>
                            <span>答题技巧</span>
                        </div>
                        <div class="exercise-item"  @click="toPractice(8)">
                            <i class="ksgz"></i>
                            <span>考试规则</span>
                        </div>
                    </div>
                </div>
            </div>
        </cui-tab-container-item>

        <cui-tab-container-item id="2">
            敬请期待
        </cui-tab-container-item>

        <cui-tab-container-item id="3">
            敬请期待
        </cui-tab-container-item>

        <cui-tab-container-item id="4">
            <div >
                <div class="practice">答题练习</div>
                <div class="exercise-model">
                    <div class="exercise-title">
                        <div class="exercise-item" @click="toPractice(1)">
                            <i class="sxlx"></i>
                            <span class="titles ">顺序练习</span>
                        </div>
                        <div class="exercise-item" @click="toPractice(2)">
                            <i class="zxlx"></i>
                            <span class="titles">专项练习</span>
                        </div>
                    </div>
                    <div class="exercise-title">
                        <div class="exercise-item"  @click="toPractice(3)">
                            <i class="sjlx"></i>
                            <span class="titles">随机练习</span>
                        </div>
                        <div class="exercise-item"  @click="toPractice(4)">
                            <i class="mnlx"></i>
                            <span class="titles">模拟考试</span>
                        </div>
                    </div>
                </div>
            </div>
            <div >
                <div class="practice">我的练习</div>
                <div class="exercise-history">
                    <div class="exercise-title">
                        <div class="exercise-item" @click="toPractice(5)">
                            <i class="wdsc"></i>
                            <span>我的收藏</span>
                        </div>
                        <div class="exercise-item" @click="toPractice(6)">
                            <i class="wdct"></i>
                            <span>我的错题</span>
                        </div>
                    </div>
                    <div class="exercise-title">
                        <div class="exercise-item" @click="toPractice(7)">
                            <i class="dtjq"></i>
                            <span>答题技巧</span>
                        </div>
                        <div class="exercise-item" @click="toPractice(8)">
                            <i class="ksgz"></i>
                            <span>考试规则</span>
                        </div>
                    </div>
                </div>
            </div>
        </cui-tab-container-item>
    </cui-tab-container>
    </div>
</div>