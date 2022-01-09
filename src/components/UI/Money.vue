<template>
  <input
    ref="input"
    class="ui-money"
    @input="onInput($event)"
    @change="onChange"
  />
</template>

<script>
import money from '@/utils/money';

export default {

  name: 'UiMoney',

  props: {
    value: {
      type: Number,
      require: true,
    },
  },

  data() {
    return {
      valueInput: '',
    };
  },

  mounted() {
    if (this.value) this.setValue(this.value.toString());
  },

  methods: {
    onInput(event) {
      let value = event.target.value.replace(/[^,.\d]/g, '').replace(',', '.');
      const positionCursor = event.target.selectionStart;
      let partsNumber = value.split('.');

      if (!partsNumber[0] && partsNumber[1]) {
        partsNumber.splice(0, 1);
      }

      if (partsNumber.length > 2) {
        partsNumber = [partsNumber[0], partsNumber[1]];
      }

      if (partsNumber[1] && partsNumber[1].length > 2) {
        partsNumber[1] = partsNumber[1].substring(0, 2);
      }

      value = partsNumber.join('.');

      this.setValue(value);
      this.toEmit();

      if (this.$refs.input.selectionStart < this.valueInput.length) {
        this.$nextTick(() => this.setCursorPosition(this.$refs.input, positionCursor));
      }
    },
    onChange() {
      const lastSymbol = this.valueInput.slice(-1);

      if (this.valueInput.indexOf('.') > -1) {
        if (lastSymbol === '.') {
          this.valueInput = this.valueInput.slice(0, -1);
        } else {
          this.valueInput = parseFloat(this.valueInput).toString();
        }

        this.toEmit();
      }
    },
    setValue(value) {
      this.valueInput = value;
      this.$refs.input.value = money.formatPrice(this.valueInput);
    },
    setCursorPosition(el, pos) {
      el.focus();
      el.setSelectionRange(pos, pos);
    },
    toEmit() {
      this.$emit('input', this.valueInput ? Number(this.valueInput) : undefined);
    },
  },
};
</script>
