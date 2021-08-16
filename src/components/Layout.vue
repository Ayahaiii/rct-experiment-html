<template>
  <div>
    <c-header></c-header>
    <c-footer></c-footer>
  </div>
</template>

<script>
import CHeader from './common/CHeader'
import CFooter from './common/CFooter'
export default {
  name: 'Layout',
  data () {
    return {
    }
  },
  components: {
    CHeader,
    CFooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
