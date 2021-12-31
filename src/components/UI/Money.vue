<template>
  <input
    :value="formattedNumber"
    ref="input"
    class="ui-money"
    @input="onInput($event)"
    @keypress="onKeyPress($event)"
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

  created() {
    if (this.value) this.valueInput = this.value.toString();
  },

  computed: {
    formattedNumber() {
      return money.formatPrice(this.valueInput);
    },
  },

  methods: {
    onInput(event) {
      const value = event.target.value.replace(/[^,.\d]/g, '').replace(',', '.');
      const positionCursor = event.target.selectionStart;
      let partsNumber = value.split('.');
      let isChangeValue = false;

      if (!value) {
        isChangeValue = true;
      }

      if (!partsNumber[0] && partsNumber[1]) {
        partsNumber.splice(0, 1);
        isChangeValue = true;
      }

      if (partsNumber.length > 2) {
        partsNumber = [partsNumber[0], partsNumber[1]];
        isChangeValue = true;
      }

      if (partsNumber[1] && partsNumber[1].length > 2) {
        partsNumber[1] = partsNumber[1].substring(0, 2);
        isChangeValue = true;
      }

      this.valueInput = partsNumber.join('.');

      if (isChangeValue) {
        this.$refs.input.value = money.formatPrice(this.valueInput);
      }

      this.toEmit();

      if (this.$refs.input.selectionStart < this.valueInput.length) {
        this.$nextTick(() => this.setCursorPosition(this.$refs.input, positionCursor));
      }
    },
    onKeyPress(event) {
      if (!/[,.0-9]/.test(event.key)) {
        event.preventDefault();
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
