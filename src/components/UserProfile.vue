<template>
  <div class="user-profile">
    <div class="user-profile_user-panel">
      <h1 class="user-profile_user-name">@{{ user.username }}</h1>
      <div class="user-profile_admin-badge" v-if="user.isAdmin">Admin</div>
      <div class="user-profile_admin-badge" v-else>User</div>
      <div class="user-profile_follower-count">
        <strong>Fooollowers: </strong> {{ followers }}
      </div>
      
      <NewTwoot @add-twoot="createNewTwoot" >
        
      </NewTwoot>
    </div>
    <div class="user-profile_twoots-wrapper">
      <TwootItem
        v-for="twoot in user.twoots"
        :key="twoot.id"
        :twoot="twoot"
        :userName="user.username"
        @favorite="toggleFavorite"
      >
      </TwootItem>
    </div>
  </div>
</template>

<script>
import NewTwoot from './NewTwoot.vue';
import TwootItem from "./TwootItem.vue";

export default {
  name: "UserProfile",
  components: { TwootItem, NewTwoot },
  data() {
    return {
      followers: 0,
      user: {
        id: 1,
        username: "fgarcia",
        firstName: "Fabio",
        lastName: "Garcia",
        email: "fgarciia@gmail.com",
        isAdmin: false,
        twoots: [
          { id: 1, content: "abc" },
          { id: 2, content: "def" },
          { id: 3, content: "ghi" },
          { id: 4, content: "jlm" },
          { id: 5, content: "nop" },
        ],
      },
      twootTypes: [
        { value: "draft", name: "Rascunho" },
        { value: "instant", name: "Twoot já" },
      ],
    };
  },
  watch: {
    followers(newFollowCount, oldFollowCount) {
      if (oldFollowCount < newFollowCount) {
        console.log(`${this.user.username} has gained a follower`);
      }
    },
  },
  computed: {
    fullname() {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
  },
  methods: {
    followerUser() {
      this.followers++;
    },
    toggleFavorite(id) {
      console.log(id);
    },
    createNewTwoot(newTwootText) {
        this.user.twoots.unshift({
          id: this.user.twoots.length + 1,
          content: newTwootText,
        });
    },
  },
  mounted() {
    // this.followerUser();
  },
};
</script>

<style lang="scss" scoped>
.user-profile {
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 100%;
  padding: 50px 5px;
  .user-profile_user-panel {
    display: flex;
    flex-direction: column;
    margin-right: 50px;
    padding: 20px;
    background-color: white;
    border-radius: 1px;
    border: 1px solid #def3e8;
    .user-profile_admin-badge {
      background: rebeccapurple;
      color: white;
      border-radius: 5px;
      margin-right: auto;
      padding: 0 10px;
      font-weight: bold;
    }

    h1 {
      margin: 0;
    }
    .user-profile_create-twoot {
      display: flex;
      flex-direction: column;
      padding-top: 20px;

      &.--exceeded {
        color: red;
        border-color: red;

        button{
          color: white;
          background-color: red;
          border: nome;
        }
      }
    }
  }
  .user-profile_twoots-wrapper {
    display: grid;
    grid-gap: 10px;
    margin-right: 20px;
  }
}
</style>
