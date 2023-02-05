<template>
    <form
        @submit.prevent="createNewTwoot"
        class="create-twoot-panel"
        :class="{ '--exceeded': newTwootCharacterCount > 180 }">

        <label for="newTwoot">
          <strong>New Twoot:</strong>
          ({{ newTwootCharacterCount }}/180)
        </label>
        
        <textarea v-model="newTwootText" id="newTwoot" rows="4"> </textarea>
        
        <div class="create-twoot-panel__submit">
            <div class="create-twoot-type">
              <label for="newTwootType"><strong>Tipo:</strong></label>
              <select v-model="selectedTwootType" id="newTwootType">
                <option
                  :value="option.value"
                  v-for="(option, index) in twootTypes"
                  :key="index"
                >
                  {{ option.name }}
                </option>
              </select>
            </div>
            <button>Twoot!!!</button>
        </div>
      </form>
</template>

<script>
export default {
  name: "NewTwoot",
  
  data() {
    return {
      twootTypes: [
        { value: "draft", name: "Rascunho" },
        { value: "instant", name: "Twoot já" },
      ],
      newTwootText: "",
      selectedTwootType: "instant",
    };
  },

  computed:{
    newTwootCharacterCount() {
      return this.newTwootText.length;
    },
  },

  methods: {
    createNewTwoot() {
      if (this.selectedTwootType != "draft" && this.newTwootText) {
        this.$emit('add-twoot', this.newTwootText);
        this.newTwootText = ''
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.create-twoot-panel {
  margin-top: 20px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;

  textarea {
    border: 1px solid #DFE3E8;
    border-radius: 5px;
  }

  .create-twoot-panel__submit {
    display: flex;
    justify-content: space-between;

    .create-twoot-type {
      padding: 10px 0;
    }

    button {
      padding: 5px 20px;
      margin: auto 0;
      border-radius: 5px;
      border: none;
      background-color: deeppink;
      color: white;
      font-weight: bold;
    }
  }

  &.--exceeded {
    color: red;
    border-color: red;

    .create-twoot-panel__submit {
      button {
        background-color: red;
        color: white;
      }
    }
  }
}
</style>
