<template>
    <div>
        <Row type="flex" align="middle" justify="center" :gutter="2">
            <Col :span="4">
                <Button type="text" icon="android-mail">Contact Us</Button>
            </Col>
            <Col :span="4">
                <Button type="text" icon="ios-home">About Us</Button>
            </Col>
            <Col :span="6"><span>&copy;1990-2018 ExamLibrary. All Rights Reserved.</span></Col>
        </Row>
    </div>   
</template>

<style lang="" scoped>
span {
    color: #80848f;
}
</style>

<script>
    export default {
    }
</script>