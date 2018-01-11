<template>
    <div class="filter-container">
        <Row type="flex" align="middle">
            <Col :span="12">
                <Input style="margin-left: 10px;" icon="ios-search-strong" placeholder="Search exam titles, description or IDs" shape="circle"></Input>
            </Col>
            <Col :span="2" :offset="8">
                <Dropdown placement="bottom-end" style="margin-left: 20px;">
                    <a href="javascript:void(0)">
                        Difficulty
                        <Icon type="arrow-down-b"></Icon>
                    </a>
                    <DropdownMenu slot="list" class="menu-item">
                        <DropdownItem v-for="item in difficulty" :key="item.label"><Checkbox v-model="item.checked" @on-change="handleChangeDifficulty">{{item.label}}</Checkbox></DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Col>
            <Col :span="2">
                <Dropdown placement="bottom-end" style="margin-left: 20px;">
                    <a href="javascript:void(0)">
                        Status
                        <Icon type="arrow-down-b"></Icon>
                    </a>
                    <DropdownMenu slot="list" class="menu-item">
                        <DropdownItem v-for="item in status" :key="item.label"><Checkbox v-model="item.checked" @on-change="handleChangeStatus">{{item.label}}</Checkbox></DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Col>
        </Row>
        <div style="text-align: left; margin: 10px 10px;">
            <template v-for="item in difficulty" v-if="item.checked"><Tag color="blue" closable :key="item.label" @on-close="item.checked = !item.checked">{{item.label}}</Tag></template>
            <template v-for="item in status" v-if="item.checked"><Tag color="blue" closable :key="item.label" @on-close="item.checked = !item.checked">{{item.label}}</Tag></template>
        </div>
    </div>
</template>

<style lang="" scoped>
    .filter-container {
        padding-top: 10px;
        border-style: ridge;
        border-width: 1px 0 1px 0;
        border-color: #bbbec4;
    }
    .menu-item {
        text-align: left;
    }
</style>

<script>
    export default {
        data() {
            return {
                difficulty: [
                    {
                        label: 'Easy',
                        checked: false
                    },
                    {
                        label: 'Medium',
                        checked: false
                    },
                    {
                        label: 'Hard',
                        checked: false
                    }
                ],
                status: [
                    {
                        label: 'Todo',
                        checked: false
                    },
                    {
                        label: 'Solved',
                        checked: false
                    },
                    {
                        label: 'Attempted',
                        checked: false
                    }
                ]
            }
        },
        methods: {
            handleChangeDifficulty() {
                var checkedItems = this.difficulty.filter(item => item.checked);
                console.log(checkedItems)
                this.$emit('changeDifficulty', checkedItems);
            },
            handleChangeStatus() {
                console.log('handle change status')
            }
        }
    }
</script>