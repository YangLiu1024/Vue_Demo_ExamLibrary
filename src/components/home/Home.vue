<template>
  <div id="home" :style="{backgroundImage: 'url(./static/asserts/backgroundImage' + backgroundImgIndex + '.jpg)'}"><!-- :style="{backgroundImage: 'url(' + imagesrc + ')'}"-->
    <header>
      <slot name="header"><home-header/></slot>
    </header>
    <main>
        <home-main/>
    </main>
    <footer>
      <slot name="footer"><home-footer/></slot>  
    </footer>   
  </div>
</template>

<script>
import homeHeader from './home_header.vue'
import homeFooter from './home_footer.vue'
import homeMain from './home_main.vue'
import {getRandomInt} from '../../utils/utils.js'

export default {
  name: 'app',
  data() {
    return {
      backgroundImgIndex: 1,
      timer: -1
    }
  },
  components: {
    homeHeader,
    homeFooter,
    homeMain
  },
  methods: {
    changeBackgroundImage() {
      const vm = this;
      console.log('change by timer ' + vm.timer)
      vm.backgroundImgIndex = getRandomInt(1, 8);
      // vm.timer = setTimeout(function() {
      //   console.log('change by timer: ' + vm.timer)
      //   clearTimeout(vm.timer);
      //   vm.backgroundImgIndex = getRandomInt(1, 8);
      //   vm.changeBackgroundImage();
      // }, 5000)
    }
  },
  mounted() {
    this.timer = setInterval(this.changeBackgroundImage, 5000);
  },
  //has to clear the timer before destroy, otherwise the callback will be unremitting
  //if not clear, the VueComponent instance will not be destroyed, its still callable in the callback
  //if go back to home component again, will create new VueComponent, then there will be two callback, if create this component again and again, the callback will be countless
  beforeDestroy() {
    console.log('before destroy. clear timer')
    clearTimeout(this.timer);
  }
}
</script>

<style scoped>
#home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* when define background image here directly, could use './asserts/elephant.jpg', when bind in style, only could access '/static/asserts/elephant.jpg'*/
  /*background-image: url('./asserts/elephant.jpg');*/
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /*transition when change background image*/
  transition: background-image 3s ease-in-out;
  -webkit-transition: background-image 3s ease-in-out;
}
/*
.imgsrc1 {
  background-image: url('./asserts/elephant.jpg')
}
.imgsrc2 {
  background-image: url('./asserts/street.jpg')
}
.imgsrc3 {
  background-image: url('./asserts/exam_success.png')
}
*/
footer {
  background-color: #e9eaec;
}
main {
  flex: 1;
}
</style>