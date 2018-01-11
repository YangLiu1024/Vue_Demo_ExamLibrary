<template>
    <div class="exam-list-container">
        <Table :columns="examTableColumns" :data="examList" :loading="loading" stripe></Table>
    </div>
</template>

<style lang="" scoped>
    .exam-list-container {
        margin: 20px 0 10px 10px;
    }    
</style>

<script>
    import {getColorByDifficulty} from '../../utils/utils.js'

    export default {
        data() {
            return {
                examTableColumns: [
                    {
                        type: 'index',
                        align: 'center',
                        width: 40
                    },
                    {
                        title: 'Title',
                        key: 'tilte',
                        align: 'left',
                        render: (h, params) => {
                            return h('div',[
                                h('Button', {
                                    props: {
                                        type: 'text'
                                    },
                                    on: {
                                        click: () => {
                                            console.log('click exam title ' + params.row.title)
                                            this.$router.push({name: 'exam-item', params: {id: params.row.route}})
                                        }
                                    }
                                }, params.row.title)
                            ])
                        }
                    },
                    {
                        title: 'Solution',
                        key: 'solution',
                        align: 'center',
                        render: function(h, params) {
                            return h('div',[
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        icon: 'document-text',
                                        shape: 'circle'
                                    },
                                    on: {
                                        click: () => {
                                            console.log('open solution')
                                        }
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: 'Acceptance',
                        key: 'acceptance',
                        align: 'left'
                    },
                    {
                        title: 'Difficulty',
                        key: 'difficulty',
                        align: 'center',
                        render: function(h, params) {
                            return h('div', [
                                h('Tag', {
                                    props: {
                                        closable: false,
                                        border: true,
                                        color: getColorByDifficulty(params.row.difficulty)
                                    }
                                }, params.row.difficulty)
                            ])
                        }
                    }
                ]
            }
        },
        props: {
            examList: {
                type: Array,
                required: true
            },
            loading: {
                type: Boolean,
                default: false
            }
        }
    }
</script>