<style scoped>

  .input-document {
    width: 100%;
  }

</style>

<template>

  <div class="input-document">
    <input
      :value="str"
      @blur="go($event)"
      :list="datalistID"
      :class="inputClass"
      :placeholder="placeholder"
      :required="required" />
    <datalist :id="datalistID">
      <option v-for="str in datalistStrings" :value="str" />
    </datalist>
  </div>

</template>

<script>

  export default {
    name: 'input-document',
    data() {
      return {
        str: ''
      }
    },
    props: {
      value: String, // The doc ID
      collection: Array,
      primaryProp: String,
      secondaryProp: String,
      secondaryPropLabel: String,
      hashProp: String,
      hashPropLabel: String,
      datalistID: String,
      inputClass: String,
      placeholder: String,
      required: Boolean
    },
    computed: {
      datalistStrings() {
        return this.collection.map((doc) => {
          return `${doc[this.primaryProp]}, ${this.secondaryPropLabel}: ${doc[this.secondaryProp]}, ${this.hashPropLabel}: #${doc[this.hashProp]}`
        })
      }
    },
    methods: {
      go(e) {
        if (!this.datalistStrings.includes(e.target.value)) {
          const VALUE_HOLD = e.target.value
          this.str = ''
          e.target.value = '' // Becouse some satanic reason, line above is not enough to reflect on view, altought it updates the value
          this.$emit('input', '')
          this.$emit('notfound', VALUE_HOLD)
        } else {
          this.$emit('input', this.hashFromStr(e.target.value))
        }
      },
      strFromHash(hash) {
        return this.datalistStrings.filter((str) => {
          return str.includes(hash)
        })[0]
      },
      hashFromStr(str) { // Get the value/doc[hashProp]
        return str.substr(str.indexOf(`#`) + 1)
      },
      updateLocalStrFromValue() {
        this.str = '' // In case it comes from outside (crudingDoc changes, etc...) (It properly works without change directly on element unlike above... I don't know why)
        if (this.value !== '') this.str = this.strFromHash(this.value)
      }
    },
    watch: {
      value() {
        this.updateLocalStrFromValue()
      },
      collection() {
        this.updateLocalStrFromValue() // Case edit linked along viewing on host form-crud
      }
    },
    mounted() {
      this.updateLocalStrFromValue()
    }
  }

</script>
