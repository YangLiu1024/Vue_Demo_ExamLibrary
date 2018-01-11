<template>
    <div class="container">
        <h1>{{examItem.title}}</h1>
        <p class="time-description">
            <span>Examination Date: {{startDate.toLocaleDateString()}}</span>
            <span>Duration: {{examItem.duration}}m</span>
        </p>
        <section v-for="(question, index) in examItem.questionList" :key="index" v-show="index == currentQuestionIndex">
            <label class="exam">{{indexLabel}}. <span>{{question.title}} ({{question.score}} points)</span></label>
            <div class="item-options">
                <RadioGroup v-model="currentQuestionAnwserIndex" @on-change="handleAnwserChange" vertical>
                    <Radio v-for="(option, optionIndex) in question.options" :key="optionIndex" :label="optionIndex">{{option}}</Radio>
                </RadioGroup>
            </div>
        </section>
        <div class="time-count-wrapper">The time left for this exam: {{hours}}:{{minutes}}:{{seconds}}</div>
        <div>
            <Page :total="totalCount" :current.sync="indexLabel" :page-size="1" @on-change="handleQuestionChange"></Page>
        </div>
        <div class="submit-button-container">
            <Button type="success" shape="circle" class="submit-button">Submit</Button>
        </div>
    </div>
</template>

<style lang="" scoped>
    .container {
        width: 100%;
        height: 100%;
        font-size: 1rem;
    }
    .container h1 {
        margin: 10px 0;
    }
    .container section, 
    .time-description,
    .time-count-wrapper {
        padding: 15px;
        text-align: left;
    }
    .time-count-wrapper,
    .time-description {
        font-size: 0.8rem;
        color: rgba(135, 134, 136, 0.84);
    }
    .time-description span:nth-child(2) {
        float: right;
    }
    .container section {
        background-image: url('./asserts/background_design.png');
        background-repeat: no-repeat;
        background-size: cover;
    }
    section .exam {
        font-size: 1.2rem;
    }
    section .ivu-radio-group .ivu-radio-group-vertical label {
        display: block;
        padding: 7px 0px;
        white-space: normal;
    }
    .ivu-radio-wrapper {
        font-size: 0.9rem;
    }
    .submit-button-container {
        margin: 20px 0;
    }
    .submit-button {
        width: 10%;
    }
</style>

<script>
    import {getNumberPrefix} from '../../utils/utils.js'
    export default {
        data() {
            return {
                examItem: {},
                totalCount: 1,
                currentQuestionIndex: 0,
                currentQuestionAnwserIndex: -1,
                questionAnwsers: [],
                startDate: new Date(),
                currentDate: Math.trunc((new Date()).getTime() / 1000),
                timer: ''
            }
        },
        computed: {
            indexLabel: {
                get: function() {
                    return this.currentQuestionIndex + 1;
                },
                set: function(value) {
                    this.currentQuestionIndex = value - 1;
                }
            },
            endTime() {
                return Math.trunc((this.startDate.getTime() + this.examItem.duration * 60 * 1000) / 1000);
            },
            seconds() {
                return getNumberPrefix((this.endTime - this.currentDate) % 60);
            },
            minutes() {
                return getNumberPrefix(Math.trunc((this.endTime - this.currentDate) / 60) % 60);
            },
            hours() {
                return getNumberPrefix(Math.trunc((this.endTime - this.currentDate) / 60 / 60) % 24);
            }
        },
        methods: {
            handleAnwserChange(anwserIndex) {
                //change anwser of current question
                this.questionAnwsers[this.currentQuestionIndex] = anwserIndex;
            },
            handleQuestionChange(indexLabel) {
                console.log('when handle on-change, the parameter: ', indexLabel, 'now, field in data: ', this.indexLabel)
                if (typeof this.questionAnwsers[indexLabel - 1] === 'undefined') {
                    this.currentQuestionAnwserIndex = -1;
                } else {
                    this.currentQuestionAnwserIndex = this.questionAnwsers[indexLabel - 1];
                }
            }
        },
        mounted() {
            console.log('route', this.$route);
            this.axios.get('http://localhost:3000' + this.$route.path)
                .then(res => {
                    console.log('data', res.data)
                    this.examItem = res.data;
                    this.totalCount = res.data.questionList.length;
                    this.timer = setInterval(() => {
                        this.currentDate = Math.trunc((new Date()).getTime() / 1000)
                    }, 1000);
                }).catch(err => {
                    console.log(err)
                })
        },
        beforeDestroy() {
            clearTimeout(this.timer);
        },
        beforeRouteUpdate() {
            clearTimeout(this.timer);
        }
    }
</script>