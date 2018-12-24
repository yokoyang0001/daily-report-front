<template>
  <v-container>
    <v-form>
      <v-card>
        <v-alert
          :value="error"
          type="error"
        >
          IDとパスワードの組みが正しくありません
        </v-alert>
        <v-card-title primary-title>
          <h3 class="headline mb-0">ログイン</h3>
        </v-card-title>
        <v-card-text>
          <v-text-field 
            v-model="name"
            label="ユーザID"
            required
          />
          <v-text-field
            v-model="password"
            label="パスワード"
            required
          />
        </v-card-text>
        <v-btn
          dark
          @click="submit"
        >
          ログイン
        </v-btn>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
export default {
  layout: 'blank',
  middleware: 'guest',
  data() {
    return {
      name: '',
      password: '',
      error: false
    }
  },
  methods: {
    async submit() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            loginId: this.name,
            password: this.password
          }
        })
        this.$router.push('/')
      } catch (e) {
        this.error = true
      }
    }
  }
}
</script>
